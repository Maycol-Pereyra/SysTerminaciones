using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
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


            CreateMap<EntidadDireccion, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => $"{ori.Descripcion} | {ori.Calle} | {ori.Casa}")
                );
            CreateMap<EntidadDireccion, EntidadDireccionVm>();

            CreateMap<EntidadDireccionVm, EntidadDireccion>();

            CreateMap<EntidadTelefono, EntidadTelefonoVm>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => ori.Telefono)
                );
            CreateMap<EntidadTelefono, EntidadTelefonoVm>();
            CreateMap<EntidadTelefonoVm, EntidadTelefono>();
        }
    }
}
