using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class ProvinciaMapper : Profile
    {
        public ProvinciaMapper()
        {
            CreateMap<Provincia, ProvinciaVm>();
            CreateMap<Provincia, ProvinciaIndex>()
                .ForMember(
                    des => des.PaisDescripcion,
                    opt => opt.MapFrom(ori => ori.Pais != null
                        ? ori.Pais.Descripcion
                        : "")
                );
            CreateMap<Provincia, ItemSelect>();
            CreateMap<ProvinciaVm, Provincia>();
        }
    }
}
