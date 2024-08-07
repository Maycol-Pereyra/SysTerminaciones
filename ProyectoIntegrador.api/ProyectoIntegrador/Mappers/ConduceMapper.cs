using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class ConduceMapper : Profile
    {
        public ConduceMapper()
        {
            CreateMap<Conduce, ConduceVm>();
            CreateMap<ConduceVm, Conduce>();

            CreateMap<ConduceDetalle, ConduceDetalleVm>();
            CreateMap<ConduceDetalleVm, ConduceDetalle>();
        }
    }
}
