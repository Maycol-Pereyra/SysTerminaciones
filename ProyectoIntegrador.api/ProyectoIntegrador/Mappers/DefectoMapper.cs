using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class DefectoMapper : Profile
    {
        public DefectoMapper()
        {
            CreateMap<Defecto, DefectoVm>();
            CreateMap<Defecto, DefectoIndex>();
            CreateMap<Defecto, ItemSelect>();
            CreateMap<DefectoVm, Defecto>();
        }
    }
}
