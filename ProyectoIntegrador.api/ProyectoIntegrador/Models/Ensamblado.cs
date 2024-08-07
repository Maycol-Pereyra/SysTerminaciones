namespace ProyectoIntegrador.Api.Models
{
    public class Ensamblado
    {
        public int Id { get; set; }
        public int DespachoId { get; set; }
        public int DesgloseCorrederaId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public string Nota { get; set; } = "";
        public int EstadoId { get; set; }
    }
}
