using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class TipoRegistroMapper : Profile
    {
        public TipoRegistroMapper()
        {
            CreateMap<TipoRegistro, TipoRegistroVm>();
            CreateMap<TipoRegistroVm, TipoRegistro>();
        }
    }
}
