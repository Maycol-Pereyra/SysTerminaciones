using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class BitacoraMapper : Profile
    {
        public BitacoraMapper()
        {
            CreateMap<Bitacora, BitacoraVm>();
            CreateMap<BitacoraVm, Bitacora>();
        }
    }
}
