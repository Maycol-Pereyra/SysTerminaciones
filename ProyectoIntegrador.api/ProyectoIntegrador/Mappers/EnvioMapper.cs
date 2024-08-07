using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class EnvioMapper : Profile
    {
        public EnvioMapper()
        {
            CreateMap<Envio, EnvioVm>();
            CreateMap<EnvioVm, Envio>();

            CreateMap<EnvioDetalle, EnvioDetalleVm>();
            CreateMap<EnvioDetalleVm, EnvioDetalle>();
        }
    }
}
