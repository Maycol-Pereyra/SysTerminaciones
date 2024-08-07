namespace ProyectoIntegrador.Api.ViewModel
{
    public class EnsambladoDetalleVm
    {
        public int EnsambladoId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int Cantidad { get; set; }
        public int CantidadPendiente { get; set; }
        public int EmpleadoAsignadoId { get; set; }
        public string Nota { get; set; } = "";
        public int EstadoId { get; set; }
    }
}
