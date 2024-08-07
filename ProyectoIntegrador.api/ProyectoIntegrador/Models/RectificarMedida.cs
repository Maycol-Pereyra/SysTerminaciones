namespace ProyectoIntegrador.Api.Models
{
    public class RectificarMedida
    {
        public int Id { get; set; }
        public int SolicitudTomaMedidaId { get; set; }
        public int? EmpleadoAsignadoId { get; set; }
        public int? VehiculoAsignadoId { get; set; }
        public DateTime? FechaCompromisoRectificarMedida { get; set; }
        public DateTime? FechaRectificarMedida { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
