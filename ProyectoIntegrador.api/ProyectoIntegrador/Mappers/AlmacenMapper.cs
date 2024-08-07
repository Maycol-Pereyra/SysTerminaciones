using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class AlmacenMapper : Profile
    {
        public AlmacenMapper()
        {
            CreateMap<Almacen, AlmacenVm>();
            CreateMap<Almacen, AlmacenIndex>();
            CreateMap<Almacen, ItemSelect>();
            CreateMap<AlmacenVm, Almacen>();
        }
    }
}
