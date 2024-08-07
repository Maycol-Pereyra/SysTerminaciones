using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.IServices
{
    public interface IDireccionService
    {
        Task<int> ObtenerDireccionId(DireccionVm direccion);
    }
}
