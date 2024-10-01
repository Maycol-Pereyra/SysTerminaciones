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
    [Route("api/vehiculo")]
    public sealed class VehiculoController : BaseController<VehiculoController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;

        public VehiculoController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            ILogger<VehiculoController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<VehiculoIndex>>> Get([FromQuery] VehiculoParameters parameter)
        {
            var lista = _dbContext.Vehiculo
                .Include(o => o.Color)
                .Include(o => o.Estado)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<VehiculoIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] VehiculoParameters parameter)
        {
            var lista = _dbContext.Vehiculo
                .Include(o => o.Color)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpGet("estado-item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetEstadoItemSelect([FromQuery] VehiculoParameters parameter)
        {
            var lista = _dbContext.Defecto
                .Where(o => o.TipoDefectoId == 16) //Estado vehiculo
                .AsNoTracking();
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] VehiculoVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Vehiculo>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.FechaModificacion = DateTime.Now;
                objNew.EstaActivo = true;

                _dbContext.Vehiculo.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetVehiculo", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Vehiculo
                .Include(o => o.Color)
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            objUpdate.FechaModificacion = DateTime.Now;

            _mapper.Map(vm, objUpdate);

            _dbContext.Vehiculo.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Vehiculo.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Vehiculo.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Vehiculo.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Vehiculo.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private static Resultado ValidarModelo(VehiculoVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Marca))
            {
                return Resultado.Invalido($"Debe de especificar la marca del vehiculo");
            }

            if (string.IsNullOrWhiteSpace(vm.Modelo))
            {
                return Resultado.Invalido($"Debe de especificar el modelo del vehiculo");
            }

            if (string.IsNullOrWhiteSpace(vm.Placa))
            {
                return Resultado.Invalido($"Debe de especificar la placa del vehiculo");
            }

            if (vm.AnoFabricacion == 0)
            {
                return Resultado.Invalido($"Debe de especificar el año de fabricación");
            }

            if (vm.ColorId == 0)
            {
                return Resultado.Invalido($"Debe de especificar el color del vehiculo");
            }

            if (vm.Kilometraje == 0)
            {
                return Resultado.Invalido($"Debe de especificar el kilometraje");
            }

            if (vm.CapacidadCarga == 0)
            {
                return Resultado.Invalido($"Debe de especificar la capacidad");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Vehiculo> Filtrar(IQueryable<Vehiculo> lista, VehiculoParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetVehiculo")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Vehiculo
                .Include(o => o.Color)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<VehiculoVm>(obj);

            return Ok(vm);
        }
    }
}
