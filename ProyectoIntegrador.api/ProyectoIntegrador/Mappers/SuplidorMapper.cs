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
        }
    }
}
