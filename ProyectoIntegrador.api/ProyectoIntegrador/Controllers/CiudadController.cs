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
    [Route("api/ciudad")]
    public sealed class CiudadController : BaseController<CiudadController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private static readonly object _object = new();

        public CiudadController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<CiudadController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<CiudadIndex>>> Get([FromQuery] CiudadParameters parameter)
        {
            var lista = _dbContext.Ciudad
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<CiudadIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] CiudadParameters parameter)
        {
            var lista = _dbContext.Ciudad
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            
            lista = lista.Where(o => o.EstaActivo);

            var items = await lista.ToListAsync();

            return Ok(_mapper.Map<List<ItemSelect>>(items));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CiudadVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Ciudad>(vm);
                objNew.FechaCreacion = DateTime.Now;

                _dbContext.Ciudad.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetCiudad", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Ciudad
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.Ciudad.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(CiudadVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe de especificar la descripción");
            }

            var obj = await _dbContext.Ciudad.AsNoTracking().FirstOrDefaultAsync(o => o.Descripcion == vm.Descripcion);

            if (obj != null)
            {
                return Resultado.Invalido($"Ya existe un registro con esa descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Ciudad> Filtrar(IQueryable<Ciudad> lista, CiudadParameters parameter)
        {
            if (parameter.ProvinciaId > 0)
            {
                lista = lista.Where(o => o.ProvinciaId == parameter.ProvinciaId);
            }

            return lista;
        }

        [HttpGet("{id}", Name = "GetCiudad")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Ciudad
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<CiudadVm>(obj);

            return Ok(vm);
        }
    }
}
