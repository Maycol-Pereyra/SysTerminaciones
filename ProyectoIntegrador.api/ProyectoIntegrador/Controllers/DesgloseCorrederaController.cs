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
using ProyectoIntegrador.Helpers;
using ProyectoIntegrador.IServices;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/desglose-corredera")]
    public sealed class DesgloseCorrederaController : BaseController<DesgloseCorrederaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;
        private readonly IDireccionService _direccionService;
        private readonly IRegistraTomaMedidaService _registraTomaMedidaService;

        public DesgloseCorrederaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            IDireccionService direccionService,
            IRegistraTomaMedidaService registraTomaMedidaService,
            ILogger<DesgloseCorrederaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
            _direccionService = direccionService;
            _registraTomaMedidaService = registraTomaMedidaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<DesgloseCorrederaIndex>>> Get([FromQuery] DesgloseCorrederaParameters parameter)
        {
            var lista = _dbContext.DesgloseCorredera
                .Include(o => o.EstadoId)
                .Include(o => o.Despacho)
                .Include(o => o.ListaDetalle)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<DesgloseCorrederaIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] DesgloseCorrederaParameters parameter)
        {
            var lista = _dbContext.DesgloseCorredera
                .Include(o => o.EstadoId)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);

            //TODO: averiguar klk con esto
            //lista = lista.Where(o => o.Estado.Descripcion == "Concluido");

            var items = await lista.ToListAsync();

            return Ok(_mapper.Map<List<ItemSelect>>(items));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] DesgloseCorrederaVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<DesgloseCorredera>(vm);
                objNew.FechaCreacion = DateTime.Now;

                MapDetalle(vm, objNew);

                _dbContext.DesgloseCorredera.Add(objNew);

                vm.Id = objNew.Id;

                objNew.NumeroDesglose = NumeracionHelper.ObtenerNumeral(vm.Id);

                _dbContext.DesgloseCorredera.Update(objNew);

                await _dbContext.SaveChangesAsync();

                return CreatedAtRoute("GetDesgloseCorredera", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.DesgloseCorredera
                .Include(o => o.EstadoId)
                .Include(o => o.Despacho)
                .Include(o => o.ListaDetalle)
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            MapDetalle(vm, objUpdate);

            _mapper.Map(vm, objUpdate);

            _dbContext.DesgloseCorredera.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private static Resultado ValidarModelo(DesgloseCorrederaVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe especificar la descripción");
            }

            if (vm.ListaDetalle.SinElementos())
            {
                return Resultado.Invalido($"Debe especificar la lista de correderas a desglosar");
            }

            foreach (var item in vm.ListaDetalle)
            {
                if (item.UnidadId == 0)
                {
                    return Resultado.Invalido($"Debe especificar la unidad del producto");
                }

                if (item.ProductoId == 0)
                {
                    return Resultado.Invalido($"Debe especificar el producto");
                }

                if (item.CantidadProducto == 0)
                {
                    return Resultado.Invalido($"Debe especificar la cantidad del producto");
                }

                if (item.MedidaAnchoProducto == 0)
                {
                    return Resultado.Invalido($"Debe especificar la medida de ancho");
                }

                if (item.MedidaAltoProducto == 0)
                {
                    return Resultado.Invalido($"Debe especificar la medida de alto");
                }
            }

            return Resultado.Ok();
        }

        private static IQueryable<DesgloseCorredera> Filtrar(IQueryable<DesgloseCorredera> lista, DesgloseCorrederaParameters parameter)
        {
            return lista;
        }

        [HttpGet("{id}", Name = "GetDesgloseCorredera")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.DesgloseCorredera
                .Include(o => o.EstadoId)
                .Include(o => o.Despacho)
                .Include(o => o.ListaDetalle)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<DesgloseCorrederaVm>(obj);

            return Ok(vm);
        }

        private void MapDetalle(DesgloseCorrederaVm origen, DesgloseCorredera destino)
        {
            if (destino.ListaDetalle == null)
            {
                destino.ListaDetalle = new List<DesgloseCorrederaDetalle>();
            }

            int cantidad = destino.ListaDetalle.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaDetalle[i];

                var itemVm = origen
                    .ListaDetalle?
                    .Where(o => o.ProductoId == item.ProductoId)
                    .Where(o => o.MedidaAnchoProducto == item.MedidaAnchoProducto)
                    .Where(o => o.MedidaAltoProducto == item.MedidaAltoProducto)
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
                foreach (var itemVm in origen.ListaDetalle
                    .Where(o => o.ProductoId <= 0)
                    .Where(o => o.MedidaAnchoProducto <= 0)
                    .Where(o => o.MedidaAltoProducto <= 0))
                {
                    var item = _mapper.Map<DesgloseCorrederaDetalle>(itemVm);

                    destino.ListaDetalle.Add(item);
                }
            }
        }
    }
}
