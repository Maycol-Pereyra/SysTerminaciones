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

        public virtual Cliente Cliente { get; set; }
        public virtual EntidadDireccion Direccion { get; set; }
        public virtual Empleado EmpleadoAsignado { get; set; }
        public virtual Vehiculo VehiculoAsignado { get; set; }
        public virtual Registro Estado { get; set; }
        public virtual List<SolicitudTomaMedidaDetalle> ListaDetalle { get; set; } = [];
    }
}
