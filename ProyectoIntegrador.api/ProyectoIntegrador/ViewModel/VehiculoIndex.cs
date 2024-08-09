namespace ProyectoIntegrador.Api.ViewModel
{
    public class VehiculoIndex
    {
        public int Id { get; set; }
        public string Marca { get; set; } = "";
        public string Modelo { get; set; } = "";
        public string Placa { get; set; } = "";
        public int ColorId { get; set; }
        public string ColorDescripcion { get; set; } = "";
        public int EstadoId { get; set; }
        public string EstadoDescripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
