namespace ProyectoIntegrador.Api.ViewModel
{
    public class DespachoVm
    {
        public int Id { get; set; }
        public int FacturaId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaDespacho { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public DateTime? FechaInstalacion { get; set; }
        public int EstadoId { get; set; }
    }
}
