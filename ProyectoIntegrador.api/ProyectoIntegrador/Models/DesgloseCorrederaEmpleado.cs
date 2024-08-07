namespace ProyectoIntegrador.Api.Models
{
    public class DesgloseCorrederaEmpleado
    {
        public int DesgloseCorrederaDetalleOrigenId { get; set; }
        public int EmpleadoAsignadoId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int CantidadPieza { get; set; }
        public int CantidadPiezaPendiente { get; set; }
        public int EstadoId { get; set; }
        public string Nota { get; set; } = "";
    }
}
