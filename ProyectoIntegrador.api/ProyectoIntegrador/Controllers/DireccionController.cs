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

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/direccion")]
    public sealed class DireccionController : BaseController<DireccionController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        
        public DireccionController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<DireccionController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<DireccionIndex>>> Get([FromQuery] DireccionParameters parameter)
        {
            var lista = _dbContext.Direccion
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<DireccionIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] DireccionParameters parameter)
        {
            var lista = _dbContext.Direccion
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] DireccionVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Direccion>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.EstaActivo = true;

                _dbContext.Direccion.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetDireccion", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Direccion
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.Direccion.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Direccion.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Direccion.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Direccion.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Direccion.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(DireccionVm vm)
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

            if (string.IsNullOrWhiteSpace(vm.Casa))
            {
                return Resultado.Invalido($"Debe de especificar la casa");
            }

            if (string.IsNullOrWhiteSpace(vm.Calle))
            {
                return Resultado.Invalido($"Debe de especificar la calle");
            }

            //TODO Maycol: evaluar tema de no registra la misma direccion varias veeces
            //var obj = await _dbContext.Direccion.AsNoTracking().FirstOrDefaultAsync(o => o. == vm.Nombre);

            //if (obj != null)
            //{
            //    return Resultado.Invalido($"Ya existe un registro con esa descripción");
            //}

            return Resultado.Ok();
        }

        private static IQueryable<Direccion> Filtrar(IQueryable<Direccion> lista, DireccionParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetDireccion")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Direccion
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<DireccionVm>(obj);

            return Ok(vm);
        }
    }
}
