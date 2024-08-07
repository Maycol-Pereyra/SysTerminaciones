using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class RegistroMapper : Profile
    {
        public RegistroMapper()
        {
            CreateMap<Registro, RegistroVm>();
            CreateMap<Registro, RegistroIndex>();
            CreateMap<Registro, ItemSelect>();
            CreateMap<RegistroVm, Registro>();
        }
    }
}
