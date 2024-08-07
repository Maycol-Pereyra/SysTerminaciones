using AutoMapper;
using ProyectoIntegrador.Models;
using ProyectoIntegrador.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class EsquemaMapper : Profile
    {
        public EsquemaMapper()
        {
            CreateMap<Esquema, EsquemaVm>();
        }
    }
}
