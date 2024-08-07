using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class RectificarMedidaDetalleMapper : Profile
    {
        public RectificarMedidaDetalleMapper()
        {
            CreateMap<RectificarMedidaDetalle, RectificarMedidaDetalleVm>();
            CreateMap<RectificarMedidaDetalleVm, RectificarMedidaDetalle>();
        }
    }
}
