using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class PerfilMapper : Profile
    {
        public PerfilMapper()
        {
            CreateMap<Perfil, PerfilVm>()
                .ForMember(
                    des => des.ListaDetalle,
                    opc => opc.Ignore()
                );

            CreateMap<Perfil, PerfilIndex>();
            CreateMap<Perfil, ItemSelect>();
            CreateMap<PerfilVm, Perfil>()
                .ForMember(
                    des => des.ListaDetalle,
                    opc => opc.Ignore()
                );

            CreateMap<PerfilAcceso, PerfilAccesoVm>();
            CreateMap<PerfilAccesoVm, PerfilAcceso>();
        }
    }
}
