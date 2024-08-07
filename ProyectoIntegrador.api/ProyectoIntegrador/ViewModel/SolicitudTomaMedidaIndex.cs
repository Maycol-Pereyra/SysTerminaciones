namespace ProyectoIntegrador.Api.ViewModel
{
    public class SolicitudTomaMedidaIndex
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNombre { get; set; } = "";
        public int? EmpleadoAsignadoId { get; set; }
        public string EmpleadoAsignadoNombre { get; set; } = "";
        public int? VehiculoAsignadoId { get; set; }
        public string VehiculoAsignadoDescripcion { get; set; } = "";
        public DateTime? FechaCompromisoTomaMedida { get; set; }
        public DateTime? FechaTomaMedida { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int EstadoId { get; set; }
        public string EstadoDescripcion { get; set; } = "";
        public string DireccionDescripcion { get; set; } = "";
    }
}
