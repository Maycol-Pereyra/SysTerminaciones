using AutoMapper;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Mappers
{
    public class CuentaContableMapper : Profile
    {
        public CuentaContableMapper()
        {
            CreateMap<CuentaContable, CuentaContableVm>();
            CreateMap<CuentaContableVm, CuentaContable>();
        }
    }
}
