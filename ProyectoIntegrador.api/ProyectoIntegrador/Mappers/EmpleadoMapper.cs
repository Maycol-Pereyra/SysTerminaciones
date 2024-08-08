using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class EmpleadoMapper : Profile
    {
        public EmpleadoMapper()
        {
            CreateMap<Empleado, EmpleadoVm>()
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
                ).ForMember(
                    des => des.PosicionDescripcion,
                    opt => opt.MapFrom(ori => ori.Posicion != null
                        ? ori.Posicion.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.DepartamentoDescripcion,
                    opt => opt.MapFrom(ori => ori.Departamento != null
                        ? ori.Departamento.Descripcion
                        : "")
                );

            CreateMap<EmpleadoVm, Empleado>();

            CreateMap<Empleado, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? $"{ori.Entidad.Nombre} {ori.Entidad.Apellido}"
                        : "")
                );

            CreateMap<Empleado, EmpleadoIndex>()
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
                ).ForMember(
                    des => des.PosicionDescripcion,
                    opt => opt.MapFrom(ori => ori.Posicion != null
                        ? ori.Posicion.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.DepartamentoDescripcion,
                    opt => opt.MapFrom(ori => ori.Departamento != null
                        ? ori.Departamento.Descripcion
                        : "")
                );

            CreateMap<EmpleadoHerramienta, EmpleadoHerramientaVm>();
            CreateMap<EmpleadoHerramientaVm, EmpleadoHerramienta>();
        }
    }
}
