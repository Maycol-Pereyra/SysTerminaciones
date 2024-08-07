using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class PaisMapper : Profile
    {
        public PaisMapper()
        {
            CreateMap<Pais, PaisVm>();
            CreateMap<Pais, PaisIndex>();
            CreateMap<Pais, ItemSelect>();
            CreateMap<PaisVm, Pais>();
        }
    }
}
