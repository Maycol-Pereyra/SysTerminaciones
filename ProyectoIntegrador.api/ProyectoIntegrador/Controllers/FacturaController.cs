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
    [Route("api/factura")]
    public sealed class FacturaController : BaseController<FacturaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IDireccionService _direccionService;

        public FacturaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IDireccionService direccionService,
            ILogger<FacturaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _direccionService = direccionService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<FacturaIndex>>> Get([FromQuery] FacturaParameters parameter)
        {
            var lista = _dbContext.Factura
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.ListaDetalle)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<FacturaIndex>>(pl.Items)));
        }

        [HttpGet("nueva-por-cotizacion/{cotizacionId}")]
        public async Task<ActionResult<FacturaVm>> GetNuevaPorSolicitudTomaMedida(int cotizacionId)
        {
            var cotizacion = await _dbContext.Cotizacion
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.ListaDetalle)
                .Where(o => o.Id == cotizacionId)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (cotizacion == null)
            {
                return BadRequest("La cotización especificada no existe");
            }

            if (cotizacion.EstaActivo == false)
            {
                return BadRequest("La cotización especificada no está en un estado válido para crear una factura");
            }

            var cotizacionVm = _mapper.Map<SolicitudTomaMedidaVm>(cotizacion);

            var facturaVm = _mapper.Map<FacturaVm>(cotizacionVm);

            return Ok(facturaVm);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] FacturaVm vm)
        {
            //TODO: Manejar el registro de factura en un stored procedure
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            var direccionVm = _mapper.Map<DireccionVm>(vm);

            vm.DireccionId = vm.LlevaEnvio || vm.LlevaInstalacion 
                ? await _direccionService.ObtenerDireccionId(direccionVm)
                : null;

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Factura>(vm);
                objNew.FechaCreacion = DateTime.Now;

                MapDetalle(vm, objNew);

                _dbContext.Factura.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                objNew.NumeroFactura = NumeracionHelper.ObtenerNumeral(vm.Id);

                _dbContext.Factura.Update(objNew);
                await _dbContext.SaveChangesAsync();

                return CreatedAtRoute("GetFactura", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Factura
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

            _dbContext.Factura.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private static Resultado ValidarModelo(FacturaVm vm)
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

        private static IQueryable<Factura> Filtrar(IQueryable<Factura> lista, FacturaParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetFactura")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Factura
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.ListaDetalle)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<FacturaVm>(obj);

            return Ok(vm);
        }

        private void MapDetalle(FacturaVm origen, Factura destino)
        {
            if (destino.ListaDetalle == null)
            {
                destino.ListaDetalle = new List<FacturaDetalle>();
            }

            int cantidad = destino.ListaDetalle.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaDetalle[i];

                var itemVm = origen
                    .ListaDetalle?
                    .Where(o => o.FacturaId == item.FacturaId)
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
                    var item = _mapper.Map<FacturaDetalle>(itemVm);

                    destino.ListaDetalle.Add(item);
                }
            }
        }
    }
}
