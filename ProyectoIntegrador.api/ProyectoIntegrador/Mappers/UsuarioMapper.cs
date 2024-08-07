using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class UsuarioMapper : Profile
    {
        public UsuarioMapper()
        {
            CreateMap<Usuario, UsuarioVm>()
                .ForMember(
                    des => des.Nombre,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Nombre
                        : "")
                )
                .ForMember(
                    des => des.Apellido,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Apellido
                        : "")
                )
                .ForMember(
                    des => des.TipoIdentificacionId,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.TipoIdentificacionId
                        : 0)
                )
                .ForMember(
                    des => des.Identificacion,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Identificacion
                        : "")
                )
                .ForMember(
                    des => des.Correo,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Correo
                        : "")
                );

            CreateMap<UsuarioVm, Usuario>()
                .ForMember(
                    des => des.ListaUsuarioPerfil,
                    opt => opt.Ignore()
                );

            CreateMap<Usuario, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? $"{ori.Entidad.Nombre} {ori.Entidad.Apellido}"
                        : "")
                );

            CreateMap<Usuario, UsuarioIndex>()
                .ForMember(
                    des => des.Nombre,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Nombre
                        : "")
                )
                .ForMember(
                    des => des.Apellido,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Apellido
                        : "")
                )
                .ForMember(
                    des => des.TipoIdentificacionId,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.TipoIdentificacionId
                        : 0)
                )
                .ForMember(
                    des => des.Identificacion,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Identificacion
                        : "")
                )
                .ForMember(
                    des => des.Correo,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Correo
                        : "")
                ); ;


            CreateMap<UsuarioPerfil, UsuarioPerfilVm>();
            CreateMap<UsuarioPerfilVm, UsuarioPerfil>();
        }
    }
}
