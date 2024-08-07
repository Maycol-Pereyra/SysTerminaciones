using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class AperturaCajaMapper : Profile
    {
        public AperturaCajaMapper()
        {
            CreateMap<AperturaCaja, AperturaCajaVm>();
            CreateMap<AperturaCajaVm, AperturaCaja>();
        }
    }
}
