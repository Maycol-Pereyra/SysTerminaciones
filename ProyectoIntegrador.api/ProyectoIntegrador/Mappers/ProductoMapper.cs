using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class ProductoMapper : Profile
    {
        public ProductoMapper()
        {
            CreateMap<Producto, ProductoVm>();
            CreateMap<Producto, ProductoIndex>()
                .ForMember(
                    des => des.CategoriaDescripcion,
                    opt => opt.MapFrom(ori => ori.Categoria != null
                        ?$"{ori.Categoria.Descripcion}"
                        :"")
                )
                .ForMember(
                    des => des.TipoProductoDescripcion,
                    opt => opt.MapFrom(ori => ori.TipoProducto != null
                        ? $"{ori.TipoProducto.Descripcion}"
                        : "")
                );
            CreateMap<Producto, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => $"{ori.Descripcion} | {ori.Color.Descripcion}")
                )
                .ForMember(
                    des => des.Objeto,
                    opt => opt.MapFrom(ori => ori)
                );


            CreateMap<ProductoVm, Producto>()
                .ForMember(
                    des => des.ListaProductoUnidad,
                    opt => opt.Ignore()
                );

            CreateMap<ProductoUnidad, ItemSelect>()
                .ForMember(
                    des => des.Id,
                    opt => opt.MapFrom(ori => ori.UnidadId)
                )
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => ori.Unidad != null
                        ? $"{ori.Unidad.Descripcion}"
                        : "")
                )
                .ForMember(
                    des => des.Objeto,
                    opt => opt.MapFrom(ori => ori)
                );

            CreateMap<ProductoUnidad, ProductoUnidadVm>()
                .ForMember(
                    des => des.UnidadDescripcion,
                    opt => opt.MapFrom(ori => ori.Unidad != null
                        ? $"{ori.Unidad.Descripcion}"
                        :"")
                );
            CreateMap<ProductoUnidadVm, ProductoUnidad>();
        }
    }
}
