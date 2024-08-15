using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class SolicitudTomaMedidaMapper : Profile
    {
        public SolicitudTomaMedidaMapper()
        {
            CreateMap<SolicitudTomaMedida, SolicitudTomaMedidaVm>()
                .ForMember(
                    des => des.ClienteNombre,
                    opt => opt.MapFrom(ori => ori.Cliente != null
                        ? $"{ori.Cliente.Entidad.Nombre} {ori.Cliente.Entidad.Apellido}"
                        : "")
                )
                .ForMember(
                    des => des.EmpleadoAsignadoNombre,
                    opt => opt.MapFrom(ori => ori.EmpleadoAsignado != null
                        ? $"{ori.EmpleadoAsignado.Entidad.Nombre} {ori.EmpleadoAsignado.Entidad.Apellido}"
                        : "")
                )
                .ForMember(
                    des => des.VehiculoAsignadoDescripcion,
                    opt => opt.MapFrom(ori => ori.VehiculoAsignado != null
                        ? $"{ori.VehiculoAsignado.Marca} | {ori.VehiculoAsignado.Modelo} | {ori.VehiculoAsignado.Placa}"
                        : "")
                )
                .ForMember(
                    des => des.EstadoDescripcion,
                    opt => opt.MapFrom(ori => ori.Estado != null
                        ? ori.Estado.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.Calle,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Calle
                        : "")
                )
                .ForMember(
                    des => des.Casa,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Casa
                        : "")
                )
                .ForMember(
                    des => des.Referencia,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Referencia
                        : "")
                )
                .ForMember(
                    des => des.PaisDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.ProvinciaDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.CiudadDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.SectorDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Descripcion
                        : "")
                );


            CreateMap<SolicitudTomaMedida, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => ori.Cliente != null
                        ? $"{ori.Cliente.Entidad.Nombre} {ori.Cliente.Entidad.Apellido} | {ori.FechaCreacion:dd/mm/yyyy}"
                        : "")
                );


            CreateMap<SolicitudTomaMedida, SolicitudTomaMedidaIndex>()
                .ForMember(
                    des => des.ClienteNombre,
                    opt => opt.MapFrom(ori => ori.Cliente != null
                        ? $"{ori.Cliente.Entidad.Nombre} {ori.Cliente.Entidad.Apellido}"
                        : "")
                )
                .ForMember(
                    des => des.EmpleadoAsignadoNombre,
                    opt => opt.MapFrom(ori => ori.EmpleadoAsignado != null
                        ? $"{ori.EmpleadoAsignado.Entidad.Nombre} {ori.EmpleadoAsignado.Entidad.Apellido}"
                        : "")
                )
                .ForMember(
                    des => des.VehiculoAsignadoDescripcion,
                    opt => opt.MapFrom(ori => ori.VehiculoAsignado != null
                        ? $"{ori.VehiculoAsignado.Marca} | {ori.VehiculoAsignado.Modelo} | {ori.VehiculoAsignado.Placa}"
                        : "")
                )
                .ForMember(
                    des => des.EstadoDescripcion,
                    opt => opt.MapFrom(ori => ori.Estado != null
                        ? ori.Estado.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.DireccionDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? $"{ori.Direccion.Descripcion} | {ori.Direccion.Calle} | {ori.Direccion.Casa}"
                        : "")
                );

            CreateMap<SolicitudTomaMedidaVm, SolicitudTomaMedida>()
                .ForMember(
                    des => des.ListaDetalle,
                    opt => opt.Ignore()
                );

            CreateMap<SolicitudTomaMedidaVm, DireccionVm>();
            
            CreateMap<SolicitudTomaMedidaVm, CotizacionVm>()
                .ForMember(
                    des => des.FechaCreacion,
                    opt => opt.MapFrom(_ => DateTime.Now)
                )
                .ForMember(
                    des => des.Id,
                    opt => opt.Ignore()
                );

            CreateMap<SolicitudTomaMedidaDetalleVm, CotizacionDetalleVm>();
        }
    }
}
