using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Api.IServices
{
    public interface IExistenciaService
    {
        Task<bool> Existe(EntidadVm entidad);
        
        Task<int> RegistraActualizaEntidad(EntidadVm entidad);

        Task<List<EntidadVm>> ObtenerSimilares(EntidadVm entidad);
    }
}
