using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class RectificarMedidaMapper : Profile
    {
        public RectificarMedidaMapper()
        {
            CreateMap<RectificarMedida, RectificarMedidaVm>();
            CreateMap<RectificarMedidaVm, RectificarMedida>();
        }
    }
}
