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
    [Route("api/caja")]
    public sealed class CajaController : BaseController<CajaController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        
        public CajaController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            ILogger<CajaController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<CajaIndex>>> Get([FromQuery] CajaParameters parameter)
        {
            var lista = _dbContext.Caja
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<CajaIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] CajaParameters parameter)
        {
            var lista = _dbContext.Caja
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CajaVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }

            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Caja>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.EstaActivo = true;

                _dbContext.Caja.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetCaja", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Caja
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            _mapper.Map(vm, objUpdate);

            _dbContext.Caja.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Caja.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Caja.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Caja.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Caja.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("abrir-caja")]
        public async Task<IActionResult> AbrirCaja([FromBody] AperturaCajaVm vm)
        {
            if (vm.CajaId == 0)
            {
                return BadRequest("Debe especificar la caja.");
            }

            if (vm.TurnoId == 0)
            {
                return BadRequest("Debe especificar el turno.");
            }

            var apertura = await _dbContext.AperturaCaja
                .Where(o => o.CajaId == vm.CajaId)
                .Where(o => o.FechaCierre == null)
                .FirstOrDefaultAsync();

            if (apertura != null)
            {
                return BadRequest("La caja ya está abierta.");
            }

            vm.UsuarioId = GetUsuarioId();
            vm.FechaCierre = null;
            vm.CuadroCaja = false;
            vm.FechaApertura = DateTime.Now;

            var aperturaCaja = _mapper.Map<AperturaCaja>(vm);

            _dbContext.AperturaCaja.Add(aperturaCaja);

            await _dbContext.SaveChangesAsync();

            //TODO: evaluar si realmente es necesario esa asignacion
            //TODO Maycol: agregar la asignacion de desglose de efectivo

            return NoContent();
        }

        [HttpPost("cerrar-caja")]
        public async Task<IActionResult> CerrarCaja([FromBody] AperturaCajaVm vm)
        {
            if (vm.CajaId == 0)
            {
                return BadRequest("Debe especificar la caja.");
            }

            if (vm.TurnoId == 0)
            {
                return BadRequest("Debe especificar el turno.");
            }

            var caja = await _dbContext.Caja
                .Where(o => o.Id == vm.CajaId)
                .FirstOrDefaultAsync();

            if (caja == null)
            {
                return BadRequest("La caja especificada no existe.");
            }

            var usuarioId = GetUsuarioId();

            var apertura = await _dbContext.AperturaCaja
                .Where(o => o.CajaId == caja.Id)
                .Where(o => o.TurnoId == vm.TurnoId)
                .Where(o => o.UsuarioId == usuarioId)
                .Where(o => o.FechaCierre == null)
                .FirstOrDefaultAsync();

            if (apertura == null)
            {
                return BadRequest("La caja que trata de cerrar no se encuentra abierta.");
            }

            if (apertura.CuadroCaja == false)
            {
                return BadRequest("Debe de hacer el cuadre de la caja antes de poder cerrarla.");
            }

            _dbContext.Caja.Update(caja);

            apertura.FechaCierre = DateTime.Now;

            _dbContext.AperturaCaja.Update(apertura);

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("cuadre-caja")]
        public async Task<IActionResult> CuadrarCaja([FromBody] CuadreCajaVm vm)
        {
            if (vm.CajaId == 0)
            {
                return BadRequest("Debe especificar la caja.");
            }

            if (vm.TurnoId == 0)
            {
                return BadRequest("Debe especificar el turno.");
            }

            var caja = await _dbContext.Caja
                .Where(o => o.Id == vm.CajaId)
                .FirstOrDefaultAsync();

            if (caja == null)
            {
                return BadRequest("La caja especificada no existe.");
            }

            var usuarioId = GetUsuarioId();

            var apertura = await _dbContext.AperturaCaja
                .Where(o => o.CajaId == caja.Id)
                .Where(o => o.TurnoId == vm.TurnoId)
                .Where(o => o.UsuarioId == usuarioId)
                .Where(o => o.FechaCierre == null)
                .FirstOrDefaultAsync();

            if (apertura == null)
            {
                return BadRequest("La caja que trata de cuadrar no existe.");
            }

            var pagos = await _dbContext.MovimientoPagoCaja
                .Include(o => o.Factura)
                .Where(o => o.AperturaCajaId == apertura.Id)
                .AsNoTracking()
                .ToListAsync();

            var pagosVm = _mapper.Map<List<MovimientoPagoCajaVm>>(pagos);

            var medioPagoEfectivoId = await _dbContext.Registro
                .Where(o => o.TipoRegistroId == 12)
                .Where(o => o.Descripcion == "Efectivo")
                .Select(o => o.Id)
                .FirstOrDefaultAsync();

            var medioPagoTarjetaId = await _dbContext.Registro
                .Where(o => o.TipoRegistroId == 12)
                .Where(o => o.Descripcion == "Tarjeta")
                .Select(o => o.Id)
                .FirstOrDefaultAsync();

            var montoEfectivo = pagosVm.Where(o => o.MedioPagoId == medioPagoEfectivoId).Select(o => o.Monto).Sum();
            var montoTarjeta = pagosVm.Where(o => o.MedioPagoId == medioPagoTarjetaId).Select(o => o.Monto).Sum();
            var montoOtro = 0m;

            var montoTotalReal = montoEfectivo + montoTarjeta + montoOtro;

            var montoTotalObtenido = vm.MontoEfectivo + vm.MontoTarjeta + vm.MontoOtro;

            if (montoTotalReal != montoTotalObtenido)
            {
                await RegistrarErrorCuadreCaja(apertura.Id, montoTotalReal - montoTotalObtenido);

                return BadRequest("Los montos ingresados no concuerdan con las ventas.");
            }

            apertura.CuadroCaja = true;

            _dbContext.AperturaCaja.Update(apertura);

            var cuadreCaja = _mapper.Map<CuadreCaja>(vm);

            cuadreCaja.UsuarioCuadreId = GetUsuarioId();
            cuadreCaja.AperturaId = apertura.Id;

            _dbContext.CuadreCaja.Update(cuadreCaja);

            await _dbContext.SaveChangesAsync();

            return NoContent();
        }


        ///////

        private async Task RegistrarErrorCuadreCaja(int aperturaCajaId, decimal monto)
        {
            var error = new ErrorCuadreCaja
            {
                AperturaCajaId = aperturaCajaId,
                UsuarioCuadreId = GetUsuarioId(),
                Monto = monto
            };

            _dbContext.ErrorCuadreCaja.Add(error);

            await _dbContext.SaveChangesAsync();
        }

        private async Task<Resultado> ValidarModelo(CajaVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe de especificar la descripción");
            }

            var obj = await _dbContext.Caja.AsNoTracking().FirstOrDefaultAsync(o => o.Descripcion == vm.Descripcion);

            if (obj != null)
            {
                return Resultado.Invalido($"Ya existe un registro con esa descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Caja> Filtrar(IQueryable<Caja> lista, CajaParameters parameter)
        {
            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            return lista;
        }

        [HttpGet("{id}", Name = "GetCaja")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Caja
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            var vm = _mapper.Map<CajaVm>(obj);

            return Ok(vm);
        }
    }
}
