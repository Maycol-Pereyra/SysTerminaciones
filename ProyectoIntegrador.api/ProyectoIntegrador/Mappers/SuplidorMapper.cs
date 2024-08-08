using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class SuplidorMapper : Profile
    {
        public SuplidorMapper()
        {
            CreateMap<Suplidor, SuplidorVm>()
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
            CreateMap<SuplidorVm, Suplidor>();

            CreateMap<Suplidor, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => ori.Entidad != null
                        ? $"{ori.Entidad.Nombre} {ori.Entidad.Apellido}"
                        : "")
                );

            CreateMap<Suplidor, SuplidorIndex>()
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
        }
    }
}
