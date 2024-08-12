using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Controllers;
using ProyectoIntegrador.Api._Core.Extensions;
using ProyectoIntegrador.Api.IServices;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.RequestParameters;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;
using ProyectoIntegrador.Api._Core.Entidades;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/perfil")]
    public sealed class PerfilController : BaseController<PerfilController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;
        
        public PerfilController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            ILogger<PerfilController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<PerfilIndex>>> Get([FromQuery] PerfilParameters parameter)
        {
            var lista = _dbContext.Perfil
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<PerfilIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] PerfilParameters parameter)
        {
            var lista = _dbContext.Perfil
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpGet("{id}", Name = "GetGeneralesPerfil")]
        public async Task<ActionResult<PerfilVm>> Get(int id)
        {
            if (id <= 0) { return BadRequest("Debe especificar el id."); }

            var obj = await _dbContext.Perfil
                .Include(o => o.ListaDetalle)
                .AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<PerfilVm>(obj);

            await CargarAcceso(vm);

            obj.ListaDetalle.ForEach(item =>
            {
                var acceso = vm.ListaDetalle.FirstOrDefault(o => o.AccesoId == item.AccesoId);
                if (acceso != null)
                {
                    acceso.Seleccionado = true;
                }
            });

            return Ok(vm);
        }

        [HttpGet("nuevo")]
        public async Task<ActionResult<PerfilVm>> GetNuevo()
        {
            var vm = new PerfilVm();

            await CargarAcceso(vm);

            return Ok(vm);
        }

        [HttpPost]
        public IActionResult Post([FromBody] PerfilVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Perfil>(vm);
                objNew.FechaCreacion = DateTime.Now;
                
                MapDetalle(vm, objNew);

                _dbContext.Perfil.Add(objNew);
                _dbContext.SaveChanges();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetPerfil", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Perfil
                .Include(o => o.ListaDetalle)
                .FirstOrDefault(o => o.Id == vm.Id);
            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            MapDetalle(vm, objUpdate);

            _dbContext.Perfil.Update(objUpdate);
            _dbContext.SaveChanges();
            return NoContent();
        }


        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Perfil.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Perfil.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Perfil.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Perfil.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private static Resultado ValidarModelo(PerfilVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe de especificar la descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Perfil> Filtrar(IQueryable<Perfil> lista, PerfilParameters parameter)
        {
            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            return lista;
        }
        private void MapDetalle(PerfilVm origen, Perfil destino)
        {
            if (destino.ListaDetalle == null)
            {
                destino.ListaDetalle = new List<PerfilAcceso>();
            }

            origen.ListaDetalle = origen.ListaDetalle.Where(o => o.Seleccionado).ToList()
                ?? new List<PerfilAccesoVm>();

            int cantidad = destino.ListaDetalle.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaDetalle[i];

                var itemVm = origen
                    .ListaDetalle?
                    .Where(o => o.PerfilId == item.PerfilId)
                    .Where(o => o.AccesoId == item.AccesoId)
                    .FirstOrDefault();

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.ListaDetalle.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaDetalle?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaDetalle.Where(o => o.PerfilId <= 0))
                {
                    var item = _mapper.Map<PerfilAcceso>(itemVm);
                    destino.ListaDetalle.Add(item);
                }
            }
        }

        private async Task CargarAcceso(PerfilVm obj)
        {
            obj.ListaDetalle = await _dbContext.Acceso
                .Select(o => new PerfilAccesoVm
                {
                    PerfilId = 0,
                    AccesoId = o.Id,
                    Seleccionado = false,
                    Modulo = o.Modulo,
                    Opcion = o.Opcion,
                    Permiso = o.Permiso,
                    Descripcion = o.Descripcion,
                })
                .ToListAsync();
        }
    }
}
