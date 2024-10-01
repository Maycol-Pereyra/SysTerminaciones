using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class HerramientaMapper : Profile
    {
        public HerramientaMapper()
        {
            CreateMap<Herramienta, HerramientaVm>();
            CreateMap<Herramienta, HerramientaIndex>()
                .ForMember(
                    des => des.EstadoDescripcion,
                    opt => opt.MapFrom(ori => ori.Estado != null
                        ? ori.Estado.Descripcion
                        : "")
                );
            CreateMap<Herramienta, ItemSelect>();
            CreateMap<HerramientaVm, Herramienta>();
        }
    }
}
