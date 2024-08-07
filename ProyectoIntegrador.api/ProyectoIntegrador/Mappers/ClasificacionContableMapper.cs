using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class ClasificacionContableMapper : Profile
    {
        public ClasificacionContableMapper()
        {
            CreateMap<ClasificacionContable, ClasificacionContableVm>();
            CreateMap<ClasificacionContableVm, ClasificacionContable>();
        }
    }
}
