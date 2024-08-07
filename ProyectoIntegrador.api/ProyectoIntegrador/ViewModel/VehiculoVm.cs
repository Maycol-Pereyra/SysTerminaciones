namespace ProyectoIntegrador.Api.ViewModel
{
    public class VehiculoVm
    {
        public int Id { get; set; }
        public string Marca { get; set; } = "";
        public string Modelo { get; set; } = "";
        public int AnoFabricacion { get; set; }
        public string Placa { get; set; } = "";
        public int ColorId { get; set; }
        public string ColorDescripcion { get; set; } = "";
        public int Kilometraje { get; set; }
        public decimal CapacidadCarga { get; set; }
        public int UnidadCargaId { get; set; }
        public int EstadoId { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
