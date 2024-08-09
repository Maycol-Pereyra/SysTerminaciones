using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class SectorMapper : Profile
    {
        public SectorMapper()
        {
            CreateMap<Sector, SectorVm>();
            CreateMap<Sector, SectorIndex>()
                .ForMember(
                    des => des.CiudadDescripcion,
                    opt => opt.MapFrom(ori => ori.Ciudad != null
                        ? ori.Ciudad.Descripcion
                        : "")
                );
            CreateMap<Sector, ItemSelect>();
            CreateMap<SectorVm, Sector>();
        }
    }
}
