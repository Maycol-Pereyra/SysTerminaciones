using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class PermisoMapper : Profile
    {
        public PermisoMapper()
        {
            CreateMap<Permiso, PermisoVm>();
            CreateMap<PermisoVm, Permiso>();
        }
    }
}
