using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class NominaMapper : Profile
    {
        public NominaMapper()
        {
            CreateMap<Nomina, NominaVm>();
            CreateMap<NominaVm, Nomina>();

            CreateMap<NominaDetalle, NominaDetalleVm>();
            CreateMap<NominaDetalleVm, NominaDetalle>();
        }
    }
}
