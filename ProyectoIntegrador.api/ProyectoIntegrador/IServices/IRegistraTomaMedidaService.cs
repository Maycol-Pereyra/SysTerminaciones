using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.IServices
{
    public interface IRegistraTomaMedidaService
    {
        Task Registra(List<TomaMedidaVm> listaDetalle);
    }
}
