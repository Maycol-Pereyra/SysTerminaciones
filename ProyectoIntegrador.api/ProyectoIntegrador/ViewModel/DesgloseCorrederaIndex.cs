namespace ProyectoIntegrador.Api.ViewModel
{
    public class DesgloseCorrederaIndex
    {
        public int Id { get; set; }
        public string NumeroDesglose { get; set; } = "";
        public string Descripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public int EstadoId { get; set; }
        public string EstadoDescripcion { get; set; } = ""; 
    }
}
