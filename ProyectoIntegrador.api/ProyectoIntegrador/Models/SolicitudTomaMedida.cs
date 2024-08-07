namespace ProyectoIntegrador.Api.Models
{
    public class SolicitudTomaMedida
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public int DireccionId { get; set; }
        public int? EmpleadoAsignadoId { get; set; }
        public int? VehiculoAsignadoId { get; set; }
        public DateTime? FechaCompromisoTomaMedida { get; set; }
        public DateTime? FechaTomaMedida { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int EstadoId { get; set; }

        public virtual Cliente Cliente { get; set; } = new();
        public virtual Direccion Direccion { get; set; } = new();
        public virtual Empleado EmpleadoAsignado { get; set; } = new();
        public virtual Vehiculo VehiculoAsignado { get; set; } = new();
        public virtual Registro Estado { get; set; } = new();
        public virtual List<SolicitudTomaMedidaDetalle> ListaDetalle { get; set; } = [];
    }
}
