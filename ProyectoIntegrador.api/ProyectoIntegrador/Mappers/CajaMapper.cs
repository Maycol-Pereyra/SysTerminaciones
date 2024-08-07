using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class CajaMapper : Profile
    {
        public CajaMapper()
        {
            CreateMap<Caja, CajaVm>();
            CreateMap<Caja, CajaIndex>();
            CreateMap<Caja, ItemSelect>();
            CreateMap<CajaVm, Caja>();

            CreateMap<ErrorCuadreCaja, ErrorCuadreCajaVm>();
            CreateMap<ErrorCuadreCajaVm, ErrorCuadreCaja>();

            CreateMap<MovimientoPagoCaja, MovimientoPagoCajaVm>()
                .ForMember(
                    des => des.MedioPagoId,
                    opt => opt.MapFrom(ori => ori.Factura != null
                        ? ori.Factura.MedioPagoId
                        : 0)
                );

            CreateMap<MovimientoPagoCajaVm, ErrorCuadreCaja>();
        }
    }
}
