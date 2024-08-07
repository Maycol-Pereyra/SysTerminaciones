using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class DistribucionEnvioMapper : Profile
    {
        public DistribucionEnvioMapper()
        {
            CreateMap<DistribucionEnvio, DistribucionEnvioVm>();
            CreateMap<DistribucionEnvioVm, DistribucionEnvio>();

            CreateMap<DistribucionEnvioVehiculo, DistribucionEnvioVehiculoVm>();
            CreateMap<DistribucionEnvioVehiculoVm, DistribucionEnvio>();
        }
    }
}
