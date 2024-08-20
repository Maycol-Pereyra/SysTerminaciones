using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Data;
using ProyectoIntegrador.IServices;
using ProyectoIntegrador.ViewModel;

namespace ProyectoIntegrador.Services
{
    public class InventarioService : IInventarioService
    {
        public ApplicationDbContext _dbContext { get; }
        public IMapper _mapper { get; }

        public InventarioService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<string>> ObtenerProductosFaltantes(List<VerificacionExistenciaDto> listaVerificar)
        {
            var listaProductosFaltantes = new List<string>();

            var listaAgrupada = listaVerificar
                .GroupBy(o => new { o.ProductoId, o.UnidadId, o.MedidaAncho, o.MedidaAlto })
                .Select(o => new VerificacionExistenciaDto
                {
                    ProductoId = o.Key.ProductoId,
                    UnidadId = o.Key.UnidadId,
                    MedidaAncho = o.Key.MedidaAncho,
                    MedidaAlto = o.Key.MedidaAlto,
                    ProductoDescripcion = o.First().ProductoDescripcion,
                    TipoProductoId = o.First().TipoProductoId,
                    Cantidad = o.Sum(x => x.Cantidad)
                })
                .ToList();

            var listaId = listaAgrupada
                .Select(o => new { o.ProductoId, o.UnidadId}).ToList();

            var estadoDisponibleId = await _dbContext.Registro
                .Where(o => o.TipoRegistroId == 22)
                .Where(o => o.Descripcion == "Disponible")
                .Select(o => o.Id)
                .FirstOrDefaultAsync();

            var inventario = await _dbContext.Inventario
                .Where(o => listaId.Contains(new { o.ProductoId, o.UnidadId }))
                .Where(o => o.EstadoId == estadoDisponibleId)
                .AsNoTracking()
                .ToListAsync();

            foreach (var item in listaAgrupada)
            {
                var usaMedidasProducto = await _dbContext.TipoProducto
                    .Where(o => o.Id == item.TipoProductoId)
                    .AsNoTracking()
                    .Select(o => o.UsaMedidasProducto)
                    .FirstOrDefaultAsync();
                
                var listaInventarioProducto = inventario
                    .Where(o => o.ProductoId == item.ProductoId)
                    .Where(o => o.UnidadId == item.UnidadId)
                    .ToList();

                if (usaMedidasProducto)
                {
                    //TODO: mejorar a futuro para que se contemple cuando es por medida de ancho o por medida de alto

                    var cantidadMaterialMedidaAncho = item.Cantidad * item.MedidaAncho;

                    //TODO: mejorar a futuro porque esta forma puede crear impases
                    var cantidadEnAlmacenMedidaAncho = listaInventarioProducto.Sum(o => o.MedidaAncho) * listaInventarioProducto.Count;

                    if (cantidadMaterialMedidaAncho > cantidadEnAlmacenMedidaAncho)
                    {
                        listaProductosFaltantes.Add(item.ProductoDescripcion);
                    }
                }
                else
                {
                    var cantidadEnInventario = listaInventarioProducto.Count;

                    if (item.Cantidad > cantidadEnInventario)
                    {
                        listaProductosFaltantes.Add(item.ProductoDescripcion);
                    }
                }
            }

            return listaProductosFaltantes;
        }
    }
}
