using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class CompraMapper : Profile
    {
        public CompraMapper()
        {
            CreateMap<Compra, CompraVm>();
            CreateMap<CompraVm, Compra>();

            CreateMap<CompraDetalle, CompraDetalleVm>();
            CreateMap<CompraDetalleVm, CompraDetalle>();
        }
    }
}
