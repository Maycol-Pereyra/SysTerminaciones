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
    [Route("api/herramienta")]
    public sealed class HerramientaController : BaseController<HerramientaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private static readonly object _object = new();

        public HerramientaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<HerramientaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<HerramientaIndex>>> Get([FromQuery] HerramientaParameters parameter)
        {
            var lista = _dbContext.Herramienta
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<HerramientaIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] HerramientaParameters parameter)
        {
            var lista = _dbContext.Herramienta
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            
            lista = lista.Where(o => o.EstaActivo);

            var items = await lista.ToListAsync();

            return Ok(_mapper.Map<List<ItemSelect>>(items));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] HerramientaVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Herramienta>(vm);

                _dbContext.Herramienta.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetHerramienta", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Herramienta
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.Herramienta.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(HerramientaVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe de especificar la descripción");
            }

            var obj = await _dbContext.Herramienta.AsNoTracking().FirstOrDefaultAsync(o => o.Descripcion == vm.Descripcion);

            if (obj != null)
            {
                return Resultado.Invalido($"Ya existe un registro con esa descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Herramienta> Filtrar(IQueryable<Herramienta> lista, HerramientaParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetHerramienta")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Herramienta
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<HerramientaVm>(obj);

            return Ok(vm);
        }
    }
}
