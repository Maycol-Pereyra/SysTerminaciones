using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class ProgramaMapper : Profile
    {
        public ProgramaMapper()
        {
            CreateMap<Programa, ProgramaVm>();
            CreateMap<ProgramaVm, Programa>();
        }
    }
}
