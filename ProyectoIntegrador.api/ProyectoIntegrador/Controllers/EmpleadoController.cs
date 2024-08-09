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

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/empleado")]
    public sealed class EmpleadoController : BaseController<EmpleadoController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;
        private static readonly object _object = new object();

        public EmpleadoController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            ILogger<EmpleadoController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
        }

        [HttpPost("existencia")]
        public async Task<ActionResult<List<EntidadVm>>> Get([FromBody] EntidadVm entidad)
        {
            if (entidad == null) { return BadRequest("Debe de especificar la entidad a comprobar"); }

            var existe = await _existenciaService.Existe(entidad);

            if (!existe) { return Ok(new List<EntidadVm>()); }

            var entidades = await _existenciaService.ObtenerSimilares(entidad);

            if (entidades.ContieneElementos())
            {
                return Ok(entidades);
            }

            return Ok(new List<EntidadVm>());
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<EmpleadoIndex>>> Get([FromQuery] EmpleadoParameters parameter)
        {
            var lista = _dbContext.Empleado
                .Include(o => o.Entidad)
                .Include(o => o.Posicion)
                .Include(o => o.Departamento)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<EmpleadoIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] EmpleadoParameters parameter)
        {
            var lista = _dbContext.Empleado
                .Include(o => o.Entidad)
                .Include(o => o.Posicion)
                .Include(o => o.Departamento)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] EmpleadoVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            var existe = await _dbContext.Empleado
                .Where(o => o.Id == vm.Id)
                .AsNoTracking()
                .AnyAsync();

            if (!existe)
            {
                var objNew = _mapper.Map<Empleado>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.EstaActivo = true;

                MapEntidadDireccion(vm, objNew);
                MapEntidadDireccion(vm, objNew);

                _dbContext.Empleado.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetEmpleado", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Empleado
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            MapEntidadDireccion(vm, objUpdate);
            MapEntidadDireccion(vm, objUpdate);

            _dbContext.Empleado.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Empleado.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Empleado.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Empleado.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Empleado.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private static Resultado ValidarModelo(EmpleadoVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Nombre))
            {
                return Resultado.Invalido($"Debe de especificar el nombre");
            }

            if (string.IsNullOrWhiteSpace(vm.Apellido))
            {
                return Resultado.Invalido($"Debe de especificar el apellido");
            }

            if (vm.Sueldo <= 0)
            {
                return Resultado.Invalido($"Debe de especificar el sueldo");
            }

            if (vm.PosicionId == 0)
            {
                return Resultado.Invalido($"Debe de especificar la posición");
            }

            if (vm.DepartamentoId == 0)
            {
                return Resultado.Invalido($"Debe de especificar el departamento");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Empleado> Filtrar(IQueryable<Empleado> lista, EmpleadoParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetEmpleado")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Empleado
                .Include(o => o.Entidad)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<EmpleadoVm>(obj);

            var listaTelefono = await _dbContext.EntidadTelefono
                .Where(o => o.EntidadId == vm.Id)
                .AsNoTracking()
                .ToListAsync();

            if (listaTelefono.ContieneElementos())
            {
                vm.ListaEntidadTelefono = _mapper.Map<List<EntidadTelefonoVm>>(listaTelefono);
            }

            var listaDireccion = await _dbContext.EntidadDireccion
                .Include(o => o.Direccion)
                .Where(o => o.EntidadId == vm.Id)
                .AsNoTracking()
                .ToListAsync();

            if (listaDireccion.ContieneElementos())
            {
                vm.ListaEntidadDireccion = _mapper.Map<List<EntidadDireccionVm>>(listaDireccion);
            }

            return Ok(vm);
        }

        private void MapEntidadDireccion(EmpleadoVm origen, Empleado destino)
        {
            if (destino.Entidad.ListaEntidadDireccion == null)
            {
                destino.Entidad.ListaEntidadDireccion = new List<EntidadDireccion>();
            }

            int cantidad = destino.Entidad.ListaEntidadDireccion.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.Entidad.ListaEntidadDireccion[i];

                var itemVm = origen
                    .ListaEntidadDireccion?
                    .FirstOrDefault(o => o.DireccionId == item.DireccionId);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.Entidad.ListaEntidadDireccion.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaEntidadDireccion?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaEntidadDireccion.Where(o => o.DireccionId <= 0))
                {
                    var item = _mapper.Map<EntidadDireccion>(itemVm);
                    item.FechaCreacion = DateTime.Now;

                    destino.Entidad.ListaEntidadDireccion.Add(item);
                }
            }
        }

        private void MapEntidadTelefono(EmpleadoVm origen, Empleado destino)
        {
            if (destino.Entidad.ListaEntidadTelefono == null)
            {
                destino.Entidad.ListaEntidadTelefono = new List<EntidadTelefono>();
            }

            int cantidad = destino.Entidad.ListaEntidadTelefono.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.Entidad.ListaEntidadTelefono[i];

                var itemVm = origen
                    .ListaEntidadTelefono?
                    .FirstOrDefault(o => o.Telefono == item.Telefono);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.Entidad.ListaEntidadTelefono.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaEntidadTelefono?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaEntidadTelefono.Where(o => o.Telefono != ""))
                {
                    var item = _mapper.Map<EntidadTelefono>(itemVm);
                    item.FechaCreacion = DateTime.Now;

                    destino.Entidad.ListaEntidadTelefono.Add(item);
                }
            }
        }
    }
}
