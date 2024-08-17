using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Controllers;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api._Core.Extensions;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.RequestParameters;
using ProyectoIntegrador.Data;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/telefono")]
    public sealed class TelefonoController : BaseController<TelefonoController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public TelefonoController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<TelefonoController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] TelefonoParameters parameter)
        {
            var lista = _dbContext.EntidadTelefono
                .AsNoTracking();
            lista = await Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }


        ///////

        private async Task<IQueryable<EntidadTelefono>> Filtrar(IQueryable<EntidadTelefono> lista, TelefonoParameters parameter)
        {
            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            if (parameter.ClienteId > 0 || parameter.SuplidorId > 0 || parameter.EmpleadoId > 0 || parameter.UsuarioId > 0)
            {
                if (parameter.ClienteId > 0)
                {
                    parameter.EntidadId = await _dbContext.Cliente
                        .Where(o => o.Id == parameter.ClienteId)
                        .AsNoTracking()
                        .Select(o => o.EntidadId)
                        .FirstOrDefaultAsync();
                }

                if (parameter.SuplidorId > 0)
                {
                    parameter.EntidadId = await _dbContext.Suplidor
                        .Where(o => o.Id == parameter.SuplidorId)
                        .AsNoTracking()
                        .Select(o => o.EntidadId)
                        .FirstOrDefaultAsync();
                }

                if (parameter.EmpleadoId > 0)
                {
                    parameter.EntidadId = await _dbContext.Empleado
                        .Where(o => o.Id == parameter.EmpleadoId)
                        .AsNoTracking()
                        .Select(o => o.EntidadId)
                        .FirstOrDefaultAsync();
                }

                if (parameter.UsuarioId > 0)
                {
                    parameter.EntidadId = await _dbContext.Usuario
                        .Where(o => o.Id == parameter.UsuarioId)
                        .AsNoTracking()
                        .Select(o => o.EntidadId)
                        .FirstOrDefaultAsync();
                }
            }


            if (parameter.EntidadId > 0)
            {
                lista = lista.Where(o => o.EntidadId == parameter.EntidadId);
            }

            return lista;
        }

        //[HttpGet("{id}", Name = "GetTelefono")]
        //public async Task<IActionResult> Get(int id)
        //{
        //    if (id <= 0)
        //    {
        //        return BadRequest("Debe especificar el id.");
        //    }

        //    var obj = await _dbContext.Telefono
        //        .FirstOrDefaultAsync(o => o.Id == id);
        //    if (obj == null)
        //    {
        //        return NotFound();
        //    }

        //    var vm = _mapper.Map<TelefonoVm>(obj);

        //    return Ok(vm);
        //}
    }
}
