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
                );


            CreateMap<EntidadDireccion, EntidadDireccionVm>()
                .ForMember(
                    des => des.Calle,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Calle
                        : "")
                )
                .ForMember(
                    des => des.Casa,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Casa
                        : "")
                )
                .ForMember(
                    des => des.Referencia,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.Referencia
                        : "")
                )
                .ForMember(
                    des => des.PaisId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.PaisId
                        : 0)
                )
                .ForMember(
                    des => des.ProvinciaId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.ProvinciaId
                        : 0)
                )
                .ForMember(
                    des => des.CiudadId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.CiudadId
                        : 0)
                )
                .ForMember(
                    des => des.SectorId,
                    opt => opt.MapFrom(ori => ori.Direccion != null
                        ? ori.Direccion.SectorId
                        : 0)
                );

            CreateMap<EntidadDireccionVm, EntidadDireccion>();

            CreateMap<EntidadTelefono, EntidadTelefonoVm>();
            CreateMap<EntidadTelefonoVm, EntidadTelefono>();
        }
    }
}
