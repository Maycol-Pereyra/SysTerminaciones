using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Controllers;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api._Core.Extensions;
using ProyectoIntegrador.Api.IServices;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.RequestParameters;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;
using ProyectoIntegrador.IServices;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/solicitud-toma-medida")]
    public sealed class SolicitudTomaMedidaController : BaseController<SolicitudTomaMedidaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;
        private readonly IDireccionService _direccionService;
        private readonly IRegistraTomaMedidaService _registraTomaMedidaService;

        public SolicitudTomaMedidaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            IDireccionService direccionService,
            IRegistraTomaMedidaService registraTomaMedidaService,
            ILogger<SolicitudTomaMedidaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
            _direccionService = direccionService;
            _registraTomaMedidaService = registraTomaMedidaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<SolicitudTomaMedidaIndex>>> Get([FromQuery] SolicitudTomaMedidaParameters parameter)
        {
            var lista = _dbContext.SolicitudTomaMedida
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.EmpleadoAsignado)
                .Include(o => o.VehiculoAsignado)
                .Include(o => o.Estado)
                .Include(o => o.ListaDetalle)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<SolicitudTomaMedidaIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] SolicitudTomaMedidaParameters parameter)
        {
            var lista = _dbContext.SolicitudTomaMedida
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.EmpleadoAsignado)
                .Include(o => o.VehiculoAsignado)
                .Include(o => o.Estado)
                .Include(o => o.ListaDetalle)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] SolicitudTomaMedidaVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            var direccionVm = _mapper.Map<DireccionVm>(vm);

            vm.DireccionId = await _direccionService.ObtenerDireccionId(direccionVm);

            await RegistraTomaMedida(vm);

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<SolicitudTomaMedida>(vm);
                objNew.FechaCreacion = DateTime.Now;

                MapDetalle(vm, objNew);

                _dbContext.SolicitudTomaMedida.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetSolicitudTomaMedida", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.SolicitudTomaMedida
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.EmpleadoAsignado)
                .Include(o => o.VehiculoAsignado)
                .Include(o => o.Estado)
                .Include(o => o.ListaDetalle)
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            MapDetalle(vm, objUpdate);

            _mapper.Map(vm, objUpdate);

            _dbContext.SolicitudTomaMedida.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private static Resultado ValidarModelo(SolicitudTomaMedidaVm vm)
        {
            if (vm.ClienteId == 0)
            {
                return Resultado.Invalido($"Debe especificar el cliente");
            }

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

            return Resultado.Ok();
        }

        private static IQueryable<SolicitudTomaMedida> Filtrar(IQueryable<SolicitudTomaMedida> lista, SolicitudTomaMedidaParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetSolicitudTomaMedida")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.SolicitudTomaMedida
                .Include(o => o.Cliente)
                .Include(o => o.Direccion)
                .Include(o => o.EmpleadoAsignado)
                .Include(o => o.VehiculoAsignado)
                .Include(o => o.Estado)
                .Include(o => o.ListaDetalle)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<SolicitudTomaMedidaVm>(obj);

            return Ok(vm);
        }

        private async Task RegistraTomaMedida(SolicitudTomaMedidaVm vm)
        {
            var listaVm = _mapper.Map<List<TomaMedidaVm>>(vm.ListaDetalle);

            await _registraTomaMedidaService.Registra(listaVm);
        }

        private void MapDetalle(SolicitudTomaMedidaVm origen, SolicitudTomaMedida destino)
        {
            if (destino.ListaDetalle == null)
            {
                destino.ListaDetalle = new List<SolicitudTomaMedidaDetalle>();
            }

            int cantidad = destino.ListaDetalle.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaDetalle[i];

                var itemVm = origen
                    .ListaDetalle?
                    .FirstOrDefault(o => o.TomaMedidaId == item.TomaMedidaId);

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
                foreach (var itemVm in origen.ListaDetalle.Where(o => o.TomaMedidaId <= 0))
                {
                    var item = _mapper.Map<SolicitudTomaMedidaDetalle>(itemVm);

                    destino.ListaDetalle.Add(item);
                }
            }
        }
    }
}
