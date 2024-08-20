using ProyectoIntegrador.ViewModel;

namespace ProyectoIntegrador.IServices
{
    public interface IInventarioService
    {
        Task<List<string>> ObtenerProductosFaltantes(List<VerificacionExistenciaDto> listaVerificar);
    }
}
