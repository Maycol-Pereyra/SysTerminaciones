namespace ProyectoIntegrador.Api.ViewModel
{
    public class EnvioVm
    {
        public int Id { get; set; }
        public int DespachoId { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public DateTime? FechaEntregaCompromiso { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int EstadoId { get; set; }
        public bool EstaActivo { get; set; }
    }
}
