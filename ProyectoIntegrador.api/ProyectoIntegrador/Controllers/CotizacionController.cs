﻿using AutoMapper;
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
using ProyectoIntegrador.ViewModel;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/cotizacion")]
    public sealed class CotizacionController : BaseController<CotizacionController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IDireccionService _direccionService;
        private readonly IInventarioService _inventarioService;

        public CotizacionController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IDireccionService direccionService,
            IInventarioService inventarioService,
            ILogger<CotizacionController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _direccionService = direccionService;
            _inventarioService = inventarioService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<CotizacionIndex>>> Get([FromQuery] CotizacionParameters parameter)
        {
            var lista = _dbContext.Cotizacion
                .Include(o => o.Cliente)
                .Include(o => o.Estado)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);
            
            await ComplementarDatosCliente(pl.Items);

            return Ok(pl.GetCopy(_mapper.Map<List<CotizacionIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] CotizacionParameters parameter)
        {
            var lista = _dbContext.Cotizacion
                .Include(o => o.Cliente)
                .Include(o => o.Estado)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            //lista = lista.Where(o => o.EstaActivo); TODO: solo filtrar por aquellos en un estado pertienente
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            await ComplementarDatosCliente(pl.Items);

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

        [HttpPost("obtener-productos-faltantes")]
        public async Task<ActionResult<List<string>>> GetProductosFaltantes([FromBody] CotizacionVm vm)
        {
            var listaVerificar = new List<VerificacionExistenciaDto>();

            var listaProductoId = vm.ListaDetalle.Select(o => o.ProductoId).ToList();

            foreach (var item in vm.ListaDetalle)
            {
                var producto = await _dbContext.Producto
                    .Include(o => o.TipoProducto)
                    .Include(o => o.ListaProductoDetalleProduccion)
                    .Where(o => o.Id == item.ProductoId)
                    .AsNoTracking()
                    .FirstOrDefaultAsync() ?? new();

                if (producto.ListaProductoDetalleProduccion.ContieneElementos())
                {
                    foreach (var objeto in producto.ListaProductoDetalleProduccion)
                    {
                        var productoConTipo = await _dbContext.Producto
                            .Include(o => o.TipoProducto)
                            .Where(o => o.Id == objeto.ProductoProduccionId)
                            .AsNoTracking()
                            .FirstOrDefaultAsync();

                        var obj = new VerificacionExistenciaDto
                        {
                            ProductoId = objeto.ProductoProduccionId,
                            ProductoDescripcion = productoConTipo?.Descripcion ?? "",
                            TipoProductoId = productoConTipo?.TipoProductoId ?? 0,
                            UnidadId = objeto.UnidadProduccionId,
                            Cantidad = objeto.Cantidad,
                            MedidaAncho = item.MedidaAncho,
                            MedidaAlto = item.MedidaAlto,
                            Descuento = objeto.Descuento,
                            Division = objeto.Division,
                            TipoProducto = _mapper.Map<TipoProductoVm>(productoConTipo?.TipoProducto ?? new()),
                        };

                        listaVerificar.Add(obj);
                    }
                }
                else
                {
                    var obj = _mapper.Map<VerificacionExistenciaDto>(item);
                    obj.TipoProductoId = producto.TipoProductoId;
                    obj.TipoProducto = _mapper.Map<TipoProductoVm>(producto.TipoProducto);

                    listaVerificar.Add(obj);
                }
            }

            var lista = await _inventarioService.ObtenerProductosFaltantes(listaVerificar);

            return lista; //TODO: completar este este endpoint cuando pueda
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CotizacionVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Cotizacion>(vm);
                objNew.UsuarioCreacionId = GetUsuarioId();
                objNew.TipoComprobanteId = 1; //TODO: asi hasta desarrollar el tema
                objNew.FechaCreacion = DateTime.Now;
                
                objNew.EstadoId = await _dbContext.Registro
                    .Where(o => o.TipoRegistroId == 27)
                    .Where(o => o.Descripcion == "En Proceso")
                    .AsNoTracking()
                    .Select(o => o.Id)
                    .FirstOrDefaultAsync();

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
                if (vm.DireccionId == 0)
                {
                    return Resultado.Invalido($"Debe de especificar la dirección");
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
                .Include(o => o.Estado)
                .Include(o => o.Telefono)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            obj.Direccion = await _dbContext.EntidadDireccion
                .Include(o => o.Pais)
                .Include(o => o.Provincia)
                .Include(o => o.Ciudad)
                .Include(o => o.Sector)
                .Where(o => o.Id == obj.DireccionId)
                .AsNoTracking()
                .FirstOrDefaultAsync() ?? new();

            obj.Cliente = await _dbContext.Cliente
                .Include(o => o.Entidad)
                .Where(o => o.Id == obj.ClienteId)
                .AsNoTracking()
                .FirstOrDefaultAsync() ?? new();

            obj.UsuarioCreacion = await _dbContext.Usuario
                .Include(o => o.Entidad)
                .Where(o => o.Id == obj.UsuarioCreacionId)
                .AsNoTracking()
                .FirstOrDefaultAsync() ?? new();

            obj.ListaDetalle = await _dbContext.CotizacionDetalle
                .Include(o => o.Producto)
                .Include(o => o.UnidadProducto)
                .Where(o => o.CotizacionId == obj.Id)
                .AsNoTracking()
                .ToListAsync();

            var vm = _mapper.Map<CotizacionVm>(obj);

            return Ok(vm);
        }

        private async Task ComplementarDatosCliente(List<Cotizacion> lista)
        {
            if (lista.SinElementos())
            {
                return;
            }

            var listaEntidadId = lista.Select(o => o.Cliente.EntidadId).ToList();

            var entidades = await _dbContext.Entidad
                .Where(o => listaEntidadId.Contains(o.Id))
                .AsNoTracking()
                .ToListAsync();

            foreach (var item in lista)
            {
                item.Cliente.Entidad = entidades.Where(o => o.Id == item.Cliente.EntidadId).FirstOrDefault() ?? new();
            }
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
                foreach (var itemVm in origen.ListaDetalle.Where(o => o.CotizacionId <= 0))
                {
                    var item = _mapper.Map<CotizacionDetalle>(itemVm);

                    destino.ListaDetalle.Add(item);
                }
            }
        }
    }
}
