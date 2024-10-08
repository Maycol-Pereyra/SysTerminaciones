﻿using AutoMapper;
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
using ProyectoIntegrador.IServices;
using ProyectoIntegrador.Models;

namespace ProyectoIntegrador.Controllers
{
    [Authorize(Policy = "Admin")]
    [Route("api/producto")]
    public sealed class ProductoController : BaseController<ProductoController>
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IExistenciaService _existenciaService;
        private readonly IDireccionService _direccionService;
        private readonly IRegistraTomaMedidaService _registraTomaMedidaService;

        public ProductoController(
            ApplicationDbContext dbContext,
            IMapper mapper,
            IExistenciaService existenciaService,
            IDireccionService direccionService,
            IRegistraTomaMedidaService registraTomaMedidaService,
            ILogger<ProductoController> logger) : base(logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _existenciaService = existenciaService;
            _direccionService = direccionService;
            _registraTomaMedidaService = registraTomaMedidaService;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<ProductoIndex>>> Get([FromQuery] ProductoParameters parameter)
        {
            var lista = _dbContext.Producto
                .Include(o => o.Categoria)
                .Include(o => o.TipoProducto)
                .Include(o => o.Color)
                .Include(o => o.Suplidor)
                .Include(o => o.ListaProductoUnidad)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ProductoIndex>>(pl.Items)));
        }

        [HttpGet("item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetItemSelect([FromQuery] ProductoParameters parameter)
        {
            var lista = _dbContext.Producto
                .Include(o => o.TipoProducto)
                .Include(o => o.Color)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            lista = lista.Where(o => o.EstaActivo);
            lista = lista.OrderBy(o => o.Id);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpGet("unidad-item-select")]
        public async Task<ActionResult<List<ItemSelect>>> GetUnidadItemSelect([FromQuery] ProductoParameters parameter)
        {
            var lista = _dbContext.ProductoUnidad
                .Include(o => o.Unidad)
                .AsNoTracking();
            lista = Filtrar(lista, parameter);
            var pl = await lista.ToPagedList(parameter);

            return Ok(pl.GetCopy(_mapper.Map<List<ItemSelect>>(pl.Items)));
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ProductoVm vm)
        {
            if (!ModelState.IsValid) { return LogModelState(ModelState); }
            
            var resultado = await ValidarModelo(vm);
            if (resultado.EsInvalido) { return BadRequest(resultado.PrimerMensaje); }

            if (vm.Id == 0)
            {
                var objNew = _mapper.Map<Producto>(vm);
                objNew.FechaCreacion = DateTime.Now;
                objNew.FechaModificacion = DateTime.Now;
                objNew.EstaActivo = true;

                MapProductoUnidad(vm, objNew);
                MapProductoDetalleProduccion(vm, objNew);

                _dbContext.Producto.Add(objNew);
                await _dbContext.SaveChangesAsync();

                vm.Id = objNew.Id;

                return CreatedAtRoute("GetProducto", new { vm.Id }, vm);
            }

            var objUpdate = _dbContext.Producto
                .Include(o => o.Categoria)
                .Include(o => o.TipoProducto)
                .Include(o => o.Color)
                .Include(o => o.Suplidor)
                .Include(o => o.ListaProductoUnidad)
                .OrderBy(o => o.Id)
                .FirstOrDefault(o => o.Id == vm.Id);

            if (objUpdate == null)
            {
                return NotFound();
            }

            MapProductoUnidad(vm, objUpdate);
            MapProductoDetalleProduccion(vm, objUpdate);

            _mapper.Map(vm, objUpdate);

            objUpdate.FechaModificacion = DateTime.Now;

            _dbContext.Producto.Update(objUpdate);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/activar")]
        public async Task<IActionResult> ActivarAsync(int id)
        {
            var obj = _dbContext.Producto.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == true)
            {
                return BadRequest("El registro ya está activo");
            }

            obj.EstaActivo = true;
            _dbContext.Producto.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{id}/inactivar")]
        public async Task<IActionResult> InactivarAsync(int id)
        {
            var obj = _dbContext.Producto.FirstOrDefault(o => o.Id == id);
            if (obj == null) { return NotFound("El registro no existe"); }

            if (obj.EstaActivo == false)
            {
                return BadRequest("El registro ya está inactivo");
            }

            obj.EstaActivo = false;
            _dbContext.Producto.Update(obj);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        ///////

        private async Task<Resultado> ValidarModelo(ProductoVm vm)
        {
            if (string.IsNullOrWhiteSpace(vm.Descripcion))
            {
                return Resultado.Invalido($"Debe especificar el nombre del producto");
            }

            if (string.IsNullOrWhiteSpace(vm.DescripcionCliente))
            {
                return Resultado.Invalido($"Debe especificar el nombre para el cliente");
            }

            if (vm.CategoriaId == 0)
            {
                return Resultado.Invalido($"Debe de especificar la categoría");
            }

            if (vm.TipoProductoId == 0)
            {
                return Resultado.Invalido($"Debe de especificar el tipo de producto");
            }

            var obj = await _dbContext.Producto
                .Where(o => o.Id != vm.Id)
                .Where(o => o.Descripcion == vm.Descripcion)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (obj != null)
            {
                return Resultado.Invalido($"Ya existe un registro con esa descripción");
            }

            return Resultado.Ok();
        }

        private static IQueryable<Producto> Filtrar(IQueryable<Producto> lista, ProductoParameters parameter)
        {
            if (parameter.ProductoId > 0)
            {
                lista = lista.Where(o => o.Id == parameter.ProductoId);
            }

            if (parameter.ProductoExcluirId > 0)
            {
                lista = lista.Where(o => o.Id != parameter.ProductoExcluirId);
            }

            if (string.IsNullOrEmpty(parameter.Criterio) == false)
            {
                lista = lista.Where(o =>
                    o.Descripcion.Contains(parameter.Criterio)
                );
            }

            return lista;
        }

        private static IQueryable<ProductoUnidad> Filtrar(IQueryable<ProductoUnidad> lista, ProductoParameters parameter)
        {
            if (parameter.ProductoId > 0)
            {
                lista = lista.Where(o => o.ProductoId == parameter.ProductoId);
            }

            if (parameter.CargarSoloUnidadVenta)
            {
                lista = lista.Where(o => o.PrecioVenta > 0);
            }
            if (parameter.CargarSoloUnidadCompra)
            {
                lista = lista.Where(o => o.PrecioCompra > 0);
            }

            return lista;
        }

        [HttpGet("{id}", Name = "GetProducto")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Debe especificar el id.");
            }

            var obj = await _dbContext.Producto
                .Include(o => o.Categoria)
                .Include(o => o.TipoProducto)
                .Include(o => o.Color)
                .Include(o => o.Suplidor)
                .FirstOrDefaultAsync(o => o.Id == id);
            if (obj == null)
            {
                return NotFound();
            }

            obj.ListaProductoUnidad = await _dbContext.ProductoUnidad
                .Include(o => o.Unidad)
                .Where(o => o.ProductoId == obj.Id)
                .AsNoTracking()
                .ToListAsync();

            obj.ListaProductoDetalleProduccion = await _dbContext.ProductoDetalleProduccion
                .Include(o => o.ProductoProduccion)
                .Include(o => o.UnidadProduccion)
                .Where(o => o.ProductoId == obj.Id)
                .AsNoTracking()
                .ToListAsync();

            var vm = _mapper.Map<ProductoVm>(obj);

            return Ok(vm);
        }

        private void MapProductoUnidad(ProductoVm origen, Producto destino)
        {
            if (destino.ListaProductoUnidad == null)
            {
                destino.ListaProductoUnidad = new List<ProductoUnidad>();
            }

            int cantidad = destino.ListaProductoUnidad.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaProductoUnidad[i];

                var itemVm = origen
                    .ListaProductoUnidad?
                    .FirstOrDefault(o => o.UnidadId == item.UnidadId);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.ListaProductoUnidad.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaProductoUnidad?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaProductoUnidad.Where(o => o.ProductoId <= 0))
                {
                    var item = _mapper.Map<ProductoUnidad>(itemVm);

                    destino.ListaProductoUnidad.Add(item);
                }
            }
        }

        private void MapProductoDetalleProduccion(ProductoVm origen, Producto destino)
        {
            if (destino.ListaProductoDetalleProduccion == null)
            {
                destino.ListaProductoDetalleProduccion = new List<ProductoDetalleProduccion>();
            }

            int cantidad = destino.ListaProductoDetalleProduccion.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaProductoDetalleProduccion[i];

                var itemVm = origen
                    .ListaProductoDetalleProduccion?
                    .FirstOrDefault(o => o.ProductoProduccionId == item.ProductoProduccionId);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.ListaProductoDetalleProduccion.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    _mapper.Map(itemVm, item);
                }
            }

            // agregar
            if (origen.ListaProductoDetalleProduccion?.Any() ?? false)
            {
                foreach (var itemVm in origen.ListaProductoDetalleProduccion.Where(o => o.ProductoId <= 0))
                {
                    var item = _mapper.Map<ProductoDetalleProduccion>(itemVm);

                    destino.ListaProductoDetalleProduccion.Add(item);
                }
            }
        }
    }
}
