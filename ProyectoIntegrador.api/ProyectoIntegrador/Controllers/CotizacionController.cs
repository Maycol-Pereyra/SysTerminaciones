using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Controllers;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api._Core.Extensions;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.RequestParameters;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;
using ProyectoIntegrador.Helpers;
using ProyectoIntegrador.IServices;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/cotizacion")]
    public sealed class CotizacionController : BaseController<CotizacionController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IDireccionService _direccionService;

        public CotizacionController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IDireccionService direccionService,
            ILogger<CotizacionController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _direccionService = direccionService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<CotizacionIndex>>> Get([FromQuery] CotizacionParameters parameter)
        {
            var lista = _dbContext.Cotizacion
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.ListaDetalle)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<CotizacionIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] CotizacionParameters parameter)
        {
            var lista = _dbContext.Cotizacion
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.ListaDetalle)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpGet("nueva-por-solicitud-toma-medida/{solicitudTomaMediddaId}")]
        public async Task<ActionResult<CotizacionVm>> GetNuevaPorSolicitudTomaMedida(int solicitudTomaMediddaId)
        {
            var solicitudTomaMedida = await _dbContext.SolicitudTomaMedida
                .Include(o => o.Cliente)
                .Include(o => o.Estado)
                .Include(o => o.ListaDetalle)
                .Where(o => o.Id == solicitudTomaMediddaId)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (solicitudTomaMedida == null)
            {
                return BadRequest("La solicitud de toma de medida especificada no existe");
            }

            if (solicitudTomaMedida.Estado.Descripcion != "Concluido")
            {
                return BadRequest("La solicitud de toma de medida especificada no está en un estado válido para crear una cotización");
            }

            foreach (var item in solicitudTomaMedida.ListaDetalle)
            {
                item.TomaMedida = await _dbContext.TomaMedida.AsNoTracking().FirstOrDefaultAsync(o => o.Id == item.TomaMedidaId) ?? new();
            }

            var solicitudTomaMedidaVm = _mapper.Map<SolicitudTomaMedidaVm>(solicitudTomaMedida);

            var cotizacionVm = _mapper.Map<CotizacionVm>(solicitudTomaMedidaVm);

            return Ok(cotizacionVm);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CotizacionVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            var direccionVm = _mapper.Map<DireccionVm>(vm);

            vm.DireccionId = await _direccionService.ObtenerDireccionId(direccionVm);

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Cotizacion>(vm);
                objNew.FechaCreacion = DateTime.Now;

                MapDetalle(vm, objNew);

                _dbContext.Cotizacion.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                objNew.NumeroCotizacion = NumeracionHelper.ObtenerNumeral(vm.Id);

                _dbContext.Cotizacion.Update(objNew);
                await _dbContext.SaveChangesAsync();

                return CreatedAtRoute("GetCotizacion", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Cotizacion
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.ListaDetalle)
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            MapDetalle(vm, objUpdate);

            _mapper.Map(vm, objUpdate);

            _dbContext.Cotizacion.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private static Resultado ValidarModelo(CotizacionVm vm)
        {
            if (vm.ClienteId == 0)
            {
                return Resultado.Invalido($"Debe especificar el cliente");
            }

            if (vm.Monto == 0)
            {
                return Resultado.Invalido($"Debe de especificar el monto");
            }

            if (vm.LlevaEnvio || vm.LlevaInstalacion)
            {
                if (vm.PaisId == 0)
                {
                    return Resultado.Invalido($"Debe de especificar el país");
                }

                if (vm.ProvinciaId == 0)
                {
                    return Resultado.Invalido($"Debe de especificar la provincia");
                }

                if (vm.CiudadId == 0)
                {
                    return Resultado.Invalido($"Debe de especificar la ciudad");
                }

                if (vm.SectorId == 0)
                {
                    return Resultado.Invalido($"Debe de especificar el sector");
                }

                if (string.IsNullOrWhiteSpace(vm.Calle))
                {
                    return Resultado.Invalido($"Debe de especificar la calle");
                }

                if (string.IsNullOrWhiteSpace(vm.Casa))
                {
                    return Resultado.Invalido($"Debe de especificar la casa");
                }
            }

            return Resultado.Ok();
        }

        private static IQueryable<Cotizacion> Filtrar(IQueryable<Cotizacion> lista, CotizacionParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetCotizacion")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Cotizacion
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.ListaDetalle)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<CotizacionVm>(obj);

            return Ok(vm);
        }

        private void MapDetalle(CotizacionVm origen, Cotizacion destino)
        {
            if (destino.ListaDetalle == null)
            {
                destino.ListaDetalle = new List<CotizacionDetalle>();
            }

            int cantidad = destino.ListaDetalle.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaDetalle[i];

                var itemVm = origen
                    .ListaDetalle?
                    .Where(o => o.CotizacionId == item.CotizacionId)
                    .Where(o => o.ProductoId == item.ProductoId)
                    .Where(o => o.MedidaAncho == item.MedidaAncho)
                    .Where(o => o.MedidaAlto == item.MedidaAlto)
                    .FirstOrDefault();

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.ListaDetalle.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaDetalle?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaDetalle.Where(o => o.ProductoId <= 0))
                {
                    var item = _mapper.Map<CotizacionDetalle>(itemVm);

                    destino.ListaDetalle.Add(item);
                }
            }
        }
    }
}
