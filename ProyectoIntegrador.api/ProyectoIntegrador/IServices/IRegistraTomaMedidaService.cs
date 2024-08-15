using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.IServices
{
    public interface IRegistraTomaMedidaService
    {
        Task<List<int>> Registra(List<TomaMedidaVm> listaDetalle);
    }
}
