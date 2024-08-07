using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Controllers;
using ProyectoIntegrador.Api.RequestParameters;
using ProyectoIntegrador.Data;
using ProyectoIntegrador.ViewModel;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/esquema")]
    public sealed class EsquemaController : BaseController<EsquemaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private static readonly object _object = new();

        public EsquemaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<EsquemaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<EsquemaVm>>> Get([FromQuery] EsquemaParameters parameter)
        {
            if (string.IsNullOrWhiteSpace(parameter.Tabla))
            {
                return BadRequest("Debe especificar el nombre de la tabla que desea consultar");
            }

            var lista = await _dbContext.Esquema
                .Where(o => o.Tabla == parameter.Tabla)
                .AsNoTracking()
                .OrderBy(o => o.Posicion)
                .ToListAsync();

            return Ok(_mapper.Map<List<EsquemaVm>>(lista));
        }
    }
}
