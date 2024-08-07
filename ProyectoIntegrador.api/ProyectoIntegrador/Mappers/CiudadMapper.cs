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
            CreateMap<Ciudad, CiudadIndex>();
            CreateMap<Ciudad, ItemSelect>();
            CreateMap<CiudadVm, Ciudad>();
        }
    }
}
