using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class DespachoMapper : Profile
    {
        public DespachoMapper()
        {
            CreateMap<Despacho, DespachoVm>();
            CreateMap<DespachoVm, Despacho>();

            CreateMap<DespachoDetalle, DespachoDetalleVm>();
            CreateMap<DespachoDetalleVm, DespachoDetalle>();
        }
    }
}
