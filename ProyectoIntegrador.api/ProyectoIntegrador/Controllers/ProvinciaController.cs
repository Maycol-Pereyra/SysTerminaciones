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
    [Route("api/provincia")]
    public sealed class ProvinciaController : BaseController<ProvinciaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        
        public ProvinciaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<ProvinciaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProvinciaIndex>>> Get([FromQuery] ProvinciaParameters parameter)
        {
            var lista = _dbContext.Provincia
                .Include(o => o.Pais)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ProvinciaIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] ProvinciaParameters parameter)
        {
            var lista = _dbContext.Provincia
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ProvinciaVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Provincia>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.EstaActivo = true;

                _dbContext.Provincia.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetProvincia", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Provincia
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.Provincia.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Provincia.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Provincia.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Provincia.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Provincia.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(ProvinciaVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe de especificar la descripción");
            }

            var obj = await _dbContext.Provincia.AsNoTracking().FirstOrDefaultAsync(o => o.Descripcion == vm.Descripcion);

            if (obj != null)
            {
                return Resultado.Invalido($"Ya existe un registro con esa descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Provincia> Filtrar(IQueryable<Provincia> lista, ProvinciaParameters parameter)
        {
            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            if (parameter.PaisId > 0)
            {
                lista = lista.Where(o => o.PaisId == parameter.PaisId);
            }

            return lista;
        }

        [HttpGet("{id}", Name = "GetProvincia")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Provincia
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<ProvinciaVm>(obj);

            return Ok(vm);
        }
    }
}
