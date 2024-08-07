using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class ConceptoMapper : Profile
    {
        public ConceptoMapper()
        {
            CreateMap<Concepto, ConceptoVm>();
            CreateMap<ConceptoVm, Concepto>();
        }
    }
}
