using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class EntidadMapper : Profile
    {
        public EntidadMapper()
        {
            CreateMap<Entidad, EntidadVm>();
            CreateMap<EntidadVm, Entidad>()
                .ForMember(
                    des => des.ListaEntidadDireccion,
                    opt => opt.Ignore()
                )
                .ForMember(
                    des => des.ListaEntidadTelefono,
                    opt => opt.Ignore()
                )
                .ForMember(
                    des => des.FechaCreacion,
                    opt => opt.Ignore()
                );


            CreateMap<EntidadDireccion, EntidadDireccionVm>();

            CreateMap<EntidadDireccionVm, EntidadDireccion>();

            CreateMap<EntidadTelefono, EntidadTelefonoVm>();
            CreateMap<EntidadTelefonoVm, EntidadTelefono>();
        }
    }
}
