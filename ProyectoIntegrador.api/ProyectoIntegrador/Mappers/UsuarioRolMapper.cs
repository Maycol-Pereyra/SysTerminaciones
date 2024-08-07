using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class UsuarioRolMapper : Profile
    {
        public UsuarioRolMapper()
        {
            CreateMap<UsuarioRol, UsuarioRolVm>();
            CreateMap<UsuarioRolVm, UsuarioRol>();
        }
    }
}
