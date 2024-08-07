using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class EnsambladoMapper : Profile
    {
        public EnsambladoMapper()
        {
            CreateMap<Ensamblado, EnsambladoVm>();
            CreateMap<EnsambladoVm, Ensamblado>();

            CreateMap<EnsambladoDetalle, EnsambladoDetalleVm>();
            CreateMap<EnsambladoDetalleVm, EnsambladoDetalle>();
        }
    }
}
