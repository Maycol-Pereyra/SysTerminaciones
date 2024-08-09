namespace ProyectoIntegrador.Api.Models
{
    public class Vehiculo
    {
        public int Id { get; set; }
        public string Marca { get; set; } = "";
        public string Modelo { get; set; } = "";
        public int AnoFabricacion { get; set; }
        public string Placa { get; set; } = "";
        public int ColorId { get; set; }
        public int Kilometraje { get; set; }
        public decimal CapacidadCarga { get; set; }
        public int UnidadCargaId { get; set; }
        public int EstadoId { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Registro Color { get; set; }
    }
}
