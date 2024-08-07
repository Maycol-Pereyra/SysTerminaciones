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
            CreateMap<Sector, SectorIndex>();
            CreateMap<Sector, ItemSelect>();
            CreateMap<SectorVm, Sector>();
        }
    }
}
