using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class TipoProductoMapper : Profile
    {
        public TipoProductoMapper()
        {
            CreateMap<TipoProducto, TipoProductoVm>();
            CreateMap<TipoProductoVm, TipoProducto>();
        }
    }
}
