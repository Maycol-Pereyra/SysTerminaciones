using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class VehiculoMapper : Profile
    {
        public VehiculoMapper()
        {
            CreateMap<Vehiculo, VehiculoVm>()
                .ForMember(
                    des => des.ColorDescripcion,
                    opt => opt.MapFrom(ori => ori.Color != null
                        ? ori.Color.Descripcion
                        : "")
                );

            CreateMap<Vehiculo, VehiculoIndex>()
                .ForMember(
                    des => des.ColorDescripcion,
                    opt => opt.MapFrom(ori => ori.Color != null
                        ? ori.Color.Descripcion
                        : "")
                )
                .ForMember(
                    des => des.EstadoDescripcion,
                    opt => opt.MapFrom(ori => ori.Estado != null
                        ? ori.Estado.Descripcion
                        : "")
                );

            CreateMap<VehiculoVm, Vehiculo>();
            
            CreateMap<Vehiculo, ItemSelect>()
                .ForMember(
                    des => des.Descripcion,
                    opt => opt.MapFrom(ori => $"{ori.Marca} | {ori.Modelo} | {ori.Placa}")
                );
        }
    }
}
