using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class DesgloseEfectivoAsignadoCajaMapper : Profile
    {
        public DesgloseEfectivoAsignadoCajaMapper()
        {
            CreateMap<DesgloseEfectivoAsignadoCaja, DesgloseEfectivoAsignadoCajaVm>();
            CreateMap<DesgloseEfectivoAsignadoCajaVm, DesgloseEfectivoAsignadoCaja>();
        }
    }
}
