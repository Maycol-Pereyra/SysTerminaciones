using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class CiudadMapper : Profile
    {
        public CiudadMapper()
        {
            CreateMap<Ciudad, CiudadVm>();
            CreateMap<Ciudad, CiudadIndex>()
                .ForMember(
                    des => des.ProvinciaDescripcion,
                    opt => opt.MapFrom(ori => ori.Provincia != null
                        ? ori.Provincia.Descripcion
                        : "")
                );
            CreateMap<Ciudad, ItemSelect>();
            CreateMap<CiudadVm, Ciudad>();
        }
    }
}
