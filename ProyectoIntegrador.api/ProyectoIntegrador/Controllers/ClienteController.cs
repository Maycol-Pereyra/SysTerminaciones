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
    [Route("api/cliente")]
    public sealed class ClienteController : BaseController<ClienteController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;
        
        public ClienteController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            ILogger<ClienteController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ClienteIndex>>> Get([FromQuery] ClienteParameters parameter)
        {
            var lista = _dbContext.Cliente
                .Include(o => o.Entidad)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ClienteIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] ClienteParameters parameter)
        {
            var lista = _dbContext.Cliente
                .Include(o => o.Entidad)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }


        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ClienteVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            vm.EntidadId = await _existenciaService.RegistraActualizaEntidad(_mapper.Map<EntidadVm>(vm));

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Cliente>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.FechaModificacion = DateTime.Now;
                objNew.EstaActivo = true;

                objNew.Entidad = await _dbContext.Entidad
                    .Where(o => o.Id == objNew.EntidadId)
                    .FirstOrDefaultAsync() ?? new Entidad();
                
                MapEntidadDireccion(vm, objNew);
                MapEntidadTelefono(vm, objNew);

                _dbContext.Cliente.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetCliente", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Cliente
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            objUpdate.Entidad.ListaEntidadDireccion = await _dbContext.EntidadDireccion
                .Where(o => o.EntidadId == objUpdate.EntidadId)
                .ToListAsync();

            objUpdate.Entidad.ListaEntidadTelefono = await _dbContext.EntidadTelefono
                .Where(o => o.EntidadId == objUpdate.EntidadId)
                .ToListAsync();

            _mapper.Map(vm, objUpdate);

            MapEntidadDireccion(vm, objUpdate);
            MapEntidadTelefono(vm, objUpdate);

            objUpdate.FechaModificacion = DateTime.Now;

            _dbContext.Cliente.Update(objUpdate);
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

        private static Resultado ValidarModelo(ClienteVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Nombre))
            {
                return Resultado.Invalido($"Debe de especificar el nombre");
            }

            if (string.IsNullOrWhiteSpace(vm.Apellido))
            {
                return Resultado.Invalido($"Debe de especificar el apellido");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Cliente> Filtrar(IQueryable<Cliente> lista, ClienteParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetCliente")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Cliente
                .Include(o => o.Entidad)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<ClienteVm>(obj);

            var listaTelefono = await _dbContext.EntidadTelefono
                .Where(o => o.EntidadId == vm.EntidadId)
                .AsNoTracking()
                .ToListAsync();

            if (listaTelefono.ContieneElementos())
            {
                vm.ListaEntidadTelefono = _mapper.Map<List<EntidadTelefonoVm>>(listaTelefono);
            }

            var listaDireccion = await _dbContext.EntidadDireccion
                .Where(o => o.EntidadId == vm.EntidadId)
                .AsNoTracking()
                .ToListAsync();

            if (listaDireccion.ContieneElementos())
            {
                vm.ListaEntidadDireccion = _mapper.Map<List<EntidadDireccionVm>>(listaDireccion);
            }

            return Ok(vm);
        }

        private void MapEntidadDireccion(ClienteVm origen, Cliente destino)
        {
            if (destino.Entidad.ListaEntidadDireccion == null)
            {
                destino.Entidad.ListaEntidadDireccion = new List<EntidadDireccion>();
            }

            int cantidad = destino.Entidad.ListaEntidadDireccion.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.Entidad.ListaEntidadDireccion[i];

                var itemVm = origen
                    .ListaEntidadDireccion?
                    .Where(o => o.PaisId == item.PaisId)
                    .Where(o => o.ProvinciaId == item.ProvinciaId)
                    .Where(o => o.CiudadId == item.CiudadId)
                    .Where(o => o.SectorId == item.SectorId)
                    .Where(o => o.Calle == item.Calle)
                    .Where(o => o.Casa == item.Casa)
                    .FirstOrDefault();

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.Entidad.ListaEntidadDireccion.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaEntidadDireccion?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaEntidadDireccion.Where(o => o.EntidadId <= 0))
                {
                    var item = _mapper.Map<EntidadDireccion>(itemVm);
                    item.FechaCreacion = DateTime.Now;

                    destino.Entidad.ListaEntidadDireccion.Add(item);
                }
            }
        }

        private void MapEntidadTelefono(ClienteVm origen, Cliente destino)
        {
            if (destino.Entidad.ListaEntidadTelefono == null)
            {
                destino.Entidad.ListaEntidadTelefono = new List<EntidadTelefono>();
            }

            int cantidad = destino.Entidad.ListaEntidadTelefono.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.Entidad.ListaEntidadTelefono[i];

                var itemVm = origen
                    .ListaEntidadTelefono?
                    .FirstOrDefault(o => o.Telefono == item.Telefono);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.Entidad.ListaEntidadTelefono.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaEntidadTelefono?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaEntidadTelefono.Where(o => o.Id <= 0))
                {
                    var item = _mapper.Map<EntidadTelefono>(itemVm);
                    item.FechaCreacion = DateTime.Now;

                    destino.Entidad.ListaEntidadTelefono.Add(item);
                }
            }
        }
    }
}
