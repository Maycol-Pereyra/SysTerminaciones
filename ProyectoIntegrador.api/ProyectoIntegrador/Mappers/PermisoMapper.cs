using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class PermisoMapper : Profile
    {
        public PermisoMapper()
        {
            CreateMap<Acceso, PermisoVm>();
            CreateMap<PermisoVm, Acceso>();
        }
    }
}
