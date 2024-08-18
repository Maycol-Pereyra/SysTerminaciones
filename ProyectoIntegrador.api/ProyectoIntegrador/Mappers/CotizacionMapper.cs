using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class CotizacionMapper : Profile
    {
        public CotizacionMapper()
        {
            CreateMap<Cotizacion, CotizacionVm>()
                .ForMember(
                    des => des.TelefonoDescripcion,
                    opt => opt.MapFrom(ori => ori.Telefono != null
                        ? ori.Telefono.Telefono
                        : "")
                )
                .ForMember(
                    des => des.ClienteNombre,
                    opt => opt.MapFrom(ori => ori.Cliente != null
                        ? $"{ori.Cliente.Entidad.Nombre} {ori.Cliente.Entidad.Apellido}"
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
                        ? ori.Direccion.Pais.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.ProvinciaDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Provincia.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.CiudadDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Ciudad.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.SectorDescripcion,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Sector.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.PaisId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.PaisId
                        : 0)
                )
                .ForMember(
                    des => des.ProvinciaId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.ProvinciaId
                        : 0)
                )
                .ForMember(
                    des => des.CiudadId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.CiudadId
                        : 0)
                )
                .ForMember(
                    des => des.SectorId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.SectorId
                        : 0)
                )
                .ForMember(
                    des => des.EstadoDescripcion,
                    opt => opt.MapFrom(ori => ori.Estado != null
                        ? ori.Estado.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.UsuarioCreacionNombre,
                    opt => opt.MapFrom(ori => ori.UsuarioCreacion != null
                        ? $"{ori.UsuarioCreacion.Entidad.Nombre} {ori.UsuarioCreacion.Entidad.Apellido}"
                        : "")
                );

            CreateMap<Cotizacion, CotizacionIndex>()
                .ForMember(
                    des => des.ClienteNombre,
                    opt => opt.MapFrom(ori => ori.Cliente != null
                        ? $"{ori.Cliente.Entidad.Nombre} {ori.Cliente.Entidad.Apellido}"
                        : "")
                )
                .ForMember(
                    des => des.EstadoDescripcion,
                    opt => opt.MapFrom(ori => ori.Estado != null
                        ? ori.Estado.Descripcion
                        : "")
                );

            CreateMap<CotizacionVm, Cotizacion>()
                .ForMember(
                    des => des.ListaDetalle,
                    opt => opt.Ignore()
                );

            CreateMap<Cotizacion, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => $"No. {ori.NumeroCotizacion}")
                );

            CreateMap<CotizacionVm, DireccionVm>();

            CreateMap<CotizacionDetalle, CotizacionDetalleVm>()
                .ForMember(
                    des => des.ProductoDescripcion,
                    opt => opt.MapFrom(ori => ori.Producto != null
                    ? ori.Producto.Descripcion
                    : "")
                )
                .ForMember(
                    des => des.UnidadProductoDescripcion,
                    opt => opt.MapFrom(ori => ori.UnidadProducto != null
                    ? ori.UnidadProducto.Descripcion
                    : "")
                );
            CreateMap<CotizacionDetalleVm, CotizacionDetalle>();
            
            
            CreateMap<CotizacionVm, FacturaVm>();
            CreateMap<CotizacionDetalleVm, FacturaDetalleVm>();
        }
    }
}
