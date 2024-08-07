using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class PerfilMapper : Profile
    {
        public PerfilMapper()
        {
            CreateMap<Perfil, PerfilVm>();
            CreateMap<Perfil, PerfilIndex>();
            CreateMap<Perfil, ItemSelect>();
            CreateMap<PerfilVm, Perfil>();

            CreateMap<PerfilPermiso, PerfilPermisoVm>();
            CreateMap<PerfilPermisoVm, PerfilPermiso>();
        }
    }
}
