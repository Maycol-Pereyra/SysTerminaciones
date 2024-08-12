using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class SolicitudTomaMedidaDetalleMapper : Profile
    {
        public SolicitudTomaMedidaDetalleMapper()
        {
            CreateMap<SolicitudTomaMedidaDetalle, SolicitudTomaMedidaDetalleVm>()
                .ForMember(
                    des => des.ProductoId,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.ProductoId
                        : 0)
                )
                .ForMember(
                    des => des.UnidadProductoId,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.UnidadProductoId
                        : 0)
                )
                .ForMember(
                    des => des.Cantidad,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.Cantidad
                        : 0)
                )
                .ForMember(
                    des => des.MedidaAncho,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.MedidaAncho
                        : 0)
                )
                .ForMember(
                    des => des.MedidaAlto,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.MedidaAlto
                        : 0)
                )
                .ForMember(
                    des => des.TipoMedidaId,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.TipoMedidaId
                        : 0)
                )
                .ForMember(
                    des => des.EsMedidaAproximada,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.EsMedidaAproximada
                        : false)
                )
                .ForMember(
                    des => des.Nota,
                    opt => opt.MapFrom(ori => ori.TomaMedida != null
                        ? ori.TomaMedida.Nota
                        : "")
                );

            CreateMap<SolicitudTomaMedidaDetalleVm, SolicitudTomaMedidaDetalle>();
            CreateMap<SolicitudTomaMedidaDetalleVm, TomaMedidaVm>()
                .ForMember(
                    des => des.Id,
                    opt => opt.MapFrom(ori => ori.TomaMedidaId)
                );


            CreateMap<SolicitudTomaMedidaDetalleVm, CotizacionDetalleVm>();
        }
    }
}
