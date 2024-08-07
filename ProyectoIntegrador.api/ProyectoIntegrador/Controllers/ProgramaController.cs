using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Controllers;
using ProyectoIntegrador.Api._Core.Extensions;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/programa")]
    public sealed class ProgramaController : BaseController<ProgramaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ProgramaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<ProgramaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProgramaVm>>> Get()
        {
            var lista = await _dbContext.Programa
                .AsNoTracking()
                .OrderBy(o => o.Descripcion)
                .ToListAsync();

            return Ok(_mapper.Map<List<ProgramaVm>>(lista));
        }

        [HttpGet("programas-con-acceso")]
        public async Task<ActionResult<List<ProgramaVm>>> GetProgramasConAcceso()
        {
            var lista = await _dbContext.Programa
                .AsNoTracking()
                .OrderBy(o => o.Descripcion)
                .ToListAsync();

            var usuarioId = GetUsuarioId();

            var listaPerfilId = await _dbContext.UsuarioPerfil
                .Where(o => o.UsuarioId == usuarioId)
                .Select(o => o.PerfilId)
                .ToListAsync();

            if (listaPerfilId.SinElementos())
            {
                return BadRequest("El usuario especificado no tiene perfiles asignados");
            }

            var listaPermisoId = await _dbContext.PerfilPermiso
                .Where(o => listaPerfilId.Contains(o.PerfilId))
                .Select(o => o.PermisoId)
                .ToListAsync();

            var listaProgramaId = await _dbContext.Permiso
                .Where(o => listaPermisoId.Contains(o.Id))
                .Select(o => o.ProgramaId)
                .ToListAsync();

            return Ok(_mapper.Map<List<ProgramaVm>>(lista.Where(o => listaProgramaId.Contains(o.Id)).ToList()));
        }
    }
}
