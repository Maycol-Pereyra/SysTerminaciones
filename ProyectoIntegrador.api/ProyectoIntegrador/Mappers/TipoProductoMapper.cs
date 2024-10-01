using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class TipoProductoMapper : Profile
    {
        public TipoProductoMapper()
        {
            CreateMap<TipoProducto, ItemSelect>()
                .ForMember(
                    des => des.Objeto,
                    opt => opt.MapFrom(ori => ori)
                );
            CreateMap<TipoProducto, TipoProductoVm>();
            CreateMap<TipoProductoVm, TipoProducto>();
        }
    }
}
