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
            CreateMap<Producto, ProductoIndex>();
            CreateMap<Producto, ItemSelect>();
            CreateMap<ProductoVm, Producto>();

            CreateMap<ProductoUnidad, ProductoUnidadVm>();
            CreateMap<ProductoUnidadVm, ProductoUnidad>();
        }
    }
}
