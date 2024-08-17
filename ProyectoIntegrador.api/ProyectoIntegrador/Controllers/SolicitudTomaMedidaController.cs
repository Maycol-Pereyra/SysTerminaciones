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
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            await ComplementarDatosEmpleado(pl.Items);
            await ComplementarDatosCliente(pl.Items);

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

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<SolicitudTomaMedida>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.EstadoId = await _dbContext.Registro
                    .Where(o => o.TipoRegistroId == 26)
                    .Where(o => o.Descripcion == "Pendiente Tomar Medidas")
                    .AsNoTracking()
                    .Select(o => o.Id)
                    .FirstOrDefaultAsync();

                _dbContext.SolicitudTomaMedida.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetSolicitudTomaMedida", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.SolicitudTomaMedida
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.SolicitudTomaMedida.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("tomar-medida")]
        public async Task<IActionResult> TomarMedidaAsync([FromBody] SolicitudTomaMedidaVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            //TODO: validar el formato de las medidas
            //var resultado = ValidarModelo(vm);
            //if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            await RegistraTomaMedida(vm);

            var objUpdate = _dbContext.SolicitudTomaMedida
                .Include(o => o.ListaDetalle)
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            MapDetalle(vm, objUpdate);

            objUpdate.FechaTomaMedida = DateTime.Now;

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

            if (vm.DireccionId == 0)
            {
                return Resultado.Invalido($"Debe especificar la dirección");
            }

            if (vm.FechaCompromisoTomaMedida != null && vm.FechaCompromisoTomaMedida < DateTime.Now)
            {
                return Resultado.Invalido($"La fecha de compromiso no puede ser menor a la fecha actual");
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
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            obj.Cliente.Entidad = await _dbContext.Entidad
                .Where(o => o.Id == obj.Cliente.EntidadId)
                .AsNoTracking()
                .FirstOrDefaultAsync() ?? new();

            obj.EmpleadoAsignado.Entidad = await _dbContext.Entidad
                .Where(o => o.Id == obj.EmpleadoAsignado.EntidadId)
                .AsNoTracking()
                .FirstOrDefaultAsync() ?? new();

            obj.ListaDetalle = await _dbContext.SolicitudTomaMedidaDetalle
                .Include(o => o.TomaMedida)
                .Where(o => o.SolicitudTomaMedidaId == obj.Id)
                .AsNoTracking()
                .ToListAsync();

            var vm = _mapper.Map<SolicitudTomaMedidaVm>(obj);

            var direccion = await _dbContext.EntidadDireccion
                .Include(o => o.Pais)
                .Include(o => o.Provincia)
                .Include(o => o.Ciudad)
                .Include(o => o.Sector)
                .Where(o => o.Id == vm.DireccionId)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (direccion != null)
            {
                vm.PaisDescripcion = direccion.Pais.Descripcion;
                vm.ProvinciaDescripcion = direccion.Provincia.Descripcion;
                vm.CiudadDescripcion = direccion.Ciudad.Descripcion;
                vm.SectorDescripcion = direccion.Sector.Descripcion;
            }

            return Ok(vm);
        }

        private async Task ComplementarDatosEmpleado(List<SolicitudTomaMedida> lista)
        {
            if (lista.SinElementos())
            {
                return;
            }

            var listaEntidadId = lista.Select(o => o.EmpleadoAsignado.EntidadId).ToList();

            var entidades = await _dbContext.Entidad
                .Where(o => listaEntidadId.Contains(o.Id))
                .AsNoTracking()
                .ToListAsync();

            foreach (var item in lista)
            {
                item.EmpleadoAsignado.Entidad = entidades.Where(o => o.Id == item.EmpleadoAsignado.EntidadId).FirstOrDefault() ?? new();
            }
        }

        private async Task ComplementarDatosCliente(List<SolicitudTomaMedida> lista)
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

        private async Task RegistraTomaMedida(SolicitudTomaMedidaVm vm)
        {
            var listaVm = _mapper.Map<List<TomaMedidaVm>>(vm.ListaDetalle);

            var listaId = await _registraTomaMedidaService.Registra(listaVm);

            for (var i = 0; i < vm.ListaDetalle.Count; i++)
            {
                vm.ListaDetalle[i].TomaMedidaId = listaId[i];
            }
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
