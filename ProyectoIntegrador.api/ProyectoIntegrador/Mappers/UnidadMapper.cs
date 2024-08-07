using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class UnidadMapper : Profile
    {
        public UnidadMapper()
        {
            CreateMap<Unidad, UnidadVm>();
            CreateMap<Unidad, UnidadIndex>();
            CreateMap<Unidad, ItemSelect>();
            CreateMap<UnidadVm, Unidad>();
        }
    }
}
