using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class UsuarioRolMapper : Profile
    {
        public UsuarioRolMapper()
        {
            CreateMap<SuplidorVm, EntidadVm>()
                .ForMember(
                    des => des.Id,
                    opt => opt.MapFrom(ori => ori.EntidadId)
                )
                .ForMember(
                    des => des.FechaCreacion,
                    opt => opt.Ignore()
                );

            CreateMap<UsuarioRol, UsuarioRolVm>();
            CreateMap<UsuarioRolVm, UsuarioRol>();
        }
    }
}
