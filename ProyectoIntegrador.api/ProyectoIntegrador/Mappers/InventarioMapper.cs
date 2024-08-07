using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class InventarioMapper : Profile
    {
        public InventarioMapper()
        {
            CreateMap<Inventario, InventarioVm>();
            CreateMap<InventarioVm, Inventario>();

            CreateMap<InventarioProductoGastable, InventarioProductoGastableVm>();
            CreateMap<InventarioProductoGastableVm, InventarioProductoGastable>();

            CreateMap<InventarioVenta, InventarioVentaVm>();
            CreateMap<InventarioVentaVm, InventarioVenta>();

            CreateMap<MovimientoInventario, MovimientoInventarioVm>();
            CreateMap<MovimientoInventarioVm, MovimientoInventario>();
        }
    }
}
