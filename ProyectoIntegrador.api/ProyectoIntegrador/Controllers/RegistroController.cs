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
    [Route("api/registro")]
    public sealed class RegistroController : BaseController<RegistroController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;

        public RegistroController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            ILogger<RegistroController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<RegistroIndex>>> Get([FromQuery] RegistroParameters parameter)
        {
            if (parameter.TipoRegistroId == 0)
            {
                return BadRequest("Debe especificar el tipo de registro al que quiere acceder");
            }

            var lista = _dbContext.Registro.AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<RegistroIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] RegistroParameters parameter)
        {
            if (parameter.TipoRegistroId == 0)
            {
                return BadRequest("Debe especificar el tipo de registro al que quiere acceder");
            }

            var lista = _dbContext.Registro.AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] RegistroVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Registro>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.EstaActivo = true;

                _dbContext.Registro.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetRegistro", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Registro
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.Registro.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Registro.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Registro.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Registro.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Registro.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(RegistroVm vm)
        {
            if (vm.TipoRegistroId == 0)
            {
                return Resultado.Invalido($"Debe especificar el tipo de registro al que quiere acceder");
            }

            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe de especificar la descripción");
            }

            var obj = await _dbContext.Registro
                .Where(o => o.TipoRegistroId == vm.TipoRegistroId)
                .Where(o => o.Id == vm.Id)
                .Where(o => o.Descripcion == vm.Descripcion)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (obj != null)
            {
                return Resultado.Invalido($"Ya existe un registro con esa descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Registro> Filtrar(IQueryable<Registro> lista, RegistroParameters parameter)
        {
            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            if (parameter.TipoRegistroId > 0)
            {
                lista = lista.Where(o => o.TipoRegistroId == parameter.TipoRegistroId);
            }

            return lista;
        }

        [HttpGet("{id}", Name = "GetRegistro")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Registro
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<RegistroVm>(obj);

            return Ok(vm);
        }
    }
}
