using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class RolMapper : Profile
    {
        public RolMapper()
        {
            CreateMap<Rol, RolVm>();
            CreateMap<RolVm, Rol>();

            CreateMap<RolPermiso, RolPermisoVm>();
            CreateMap<RolPermisoVm, RolPermiso>();
        }
    }
}
