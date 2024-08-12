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
            CreateMap<UsuarioVm, EntidadVm>()
                .ForMember(
                    des => des.Id,
                    opt => opt.MapFrom(ori => ori.EntidadId)
                );

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
                    des => des.Cedula,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Cedula
                        : "")
                )
                .ForMember(
                    des => des.Rnc,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Rnc
                        : "")
                )
                .ForMember(
                    des => des.Pasaporte,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Pasaporte
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
                    des => des.Cedula,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Cedula
                        : "")
                )
                .ForMember(
                    des => des.Rnc,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Rnc
                        : "")
                )
                .ForMember(
                    des => des.Pasaporte,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? ori.Entidad.Pasaporte
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
