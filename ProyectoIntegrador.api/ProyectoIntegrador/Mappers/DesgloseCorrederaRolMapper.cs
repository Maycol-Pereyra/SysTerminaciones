using AutoMapper;
using ProyectoIntegrador.Api._Core.Entidades;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class DesgloseCorrederaMapper : Profile
    {
        public DesgloseCorrederaMapper()
        {
            CreateMap<DesgloseCorredera, DesgloseCorrederaVm>();
            CreateMap<DesgloseCorredera, DesgloseCorrederaIndex>();
            CreateMap<DesgloseCorredera, ItemSelect>();
            CreateMap<DesgloseCorrederaVm, DesgloseCorredera>();

            CreateMap<DesgloseCorrederaDetalle, DesgloseCorrederaDetalleVm>();
            CreateMap<DesgloseCorrederaDetalleVm, DesgloseCorrederaDetalle>();

            CreateMap<DesgloseCorrederaEmpleado, DesgloseCorrederaEmpleadoVm>();
            CreateMap<DesgloseCorrederaEmpleadoVm, DesgloseCorrederaEmpleado>();
        }
    }
}
