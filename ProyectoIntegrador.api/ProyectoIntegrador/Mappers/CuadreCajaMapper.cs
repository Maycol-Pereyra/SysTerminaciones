using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class CuadreCajaMapper : Profile
    {
        public CuadreCajaMapper()
        {
            CreateMap<CuadreCaja, CuadreCajaVm>();
            CreateMap<CuadreCajaVm, CuadreCaja>();
        }
    }
}
