using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class CargamentoVehiculoMapper : Profile
    {
        public CargamentoVehiculoMapper()
        {
            CreateMap<CargamentoVehiculo, CargamentoVehiculoVm>();
            CreateMap<CargamentoVehiculoVm, CargamentoVehiculo>();
        }
    }
}
