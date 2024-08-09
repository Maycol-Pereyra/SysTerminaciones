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
    [Route("api/pais")]
    public sealed class PaisController : BaseController<PaisController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        
        public PaisController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<PaisController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<PaisIndex>>> Get([FromQuery] PaisParameters parameter)
        {
            var lista = _dbContext.Pais
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<PaisIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] PaisParameters parameter)
        {
            var lista = _dbContext.Pais
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] PaisVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Pais>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.EstaActivo = true;

                _dbContext.Pais.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetPais", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Pais
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.Pais.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Pais.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Pais.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Pais.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Pais.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(PaisVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe de especificar la descripción");
            }

            var obj = await _dbContext.Pais.AsNoTracking().FirstOrDefaultAsync(o => o.Descripcion == vm.Descripcion);

            if (obj != null)
            {
                return Resultado.Invalido($"Ya existe un registro con esa descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Pais> Filtrar(IQueryable<Pais> lista, PaisParameters parameter)
        {
            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            return lista;
        }

        [HttpGet("{id}", Name = "GetPais")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Pais
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<PaisVm>(obj);

            return Ok(vm);
        }
    }
}
