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
    [Route("api/defecto")]
    public sealed class DefectoController : BaseController<DefectoController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;

        public DefectoController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            ILogger<DefectoController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<DefectoIndex>>> Get([FromQuery] DefectoParameters parameter)
        {
            if (parameter.TipoDefectoId == 0)
            {
                return BadRequest("Debe especificar el tipo de defecto al que quiere acceder");
            }

            var lista = _dbContext.Defecto.AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<DefectoIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] DefectoParameters parameter)
        {
            if (parameter.TipoDefectoId == 0)
            {
                return BadRequest("Debe especificar el tipo de defecto al que quiere acceder");
            }

            var lista = _dbContext.Defecto.AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        ///////

        private static IQueryable<Defecto> Filtrar(IQueryable<Defecto> lista, DefectoParameters parameter)
        {
            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            if (parameter.TipoDefectoId > 0)
            {
                lista = lista.Where(o => o.TipoDefectoId == parameter.TipoDefectoId);
            }

            return lista;
        }

        [HttpGet("{id}", Name = "GetDefecto")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Defecto
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<DefectoVm>(obj);

            return Ok(vm);
        }
    }
}
