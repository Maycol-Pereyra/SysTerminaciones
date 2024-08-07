namespace ProyectoIntegrador.Api.Models
{
    public class Conduce
    {
        public int Id { get; set; }
        public int FacturaId { get; set; }
        public int? DireccionId { get; set; }
        public string Telefono { get; set; } = "";
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaRegistro { get; set; }
    }
}
