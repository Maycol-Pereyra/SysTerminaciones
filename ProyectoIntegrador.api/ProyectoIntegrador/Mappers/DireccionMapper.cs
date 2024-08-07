using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class DireccionMapper : Profile
    {
        public DireccionMapper()
        {
            CreateMap<Direccion, DireccionVm>();
            CreateMap<Direccion, DireccionIndex>();
            CreateMap<Direccion, ItemSelect>();
            CreateMap<DireccionVm, Direccion>();
        }
    }
}
