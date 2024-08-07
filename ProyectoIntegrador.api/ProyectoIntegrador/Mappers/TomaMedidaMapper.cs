using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class TomaMedidaMapper : Profile
    {
        public TomaMedidaMapper()
        {
            CreateMap<TomaMedida, TomaMedidaVm>();
            CreateMap<TomaMedidaVm, TomaMedida>();
        }
    }
}
