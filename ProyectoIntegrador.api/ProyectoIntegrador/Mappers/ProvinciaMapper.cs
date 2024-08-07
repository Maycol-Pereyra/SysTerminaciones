using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class ProvinciaMapper : Profile
    {
        public ProvinciaMapper()
        {
            CreateMap<Provincia, ProvinciaVm>();
            CreateMap<Provincia, ProvinciaIndex>();
            CreateMap<Provincia, ItemSelect>();
            CreateMap<ProvinciaVm, Provincia>();
        }
    }
}
