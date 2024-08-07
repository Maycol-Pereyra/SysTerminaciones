namespace ProyectoIntegrador.Api.ViewModel
{
    public class DistribucionEnvioVm
    {
        public int Id { get; set; }
        public int EstadoId { get; set; }
        public DateTime? FechaDistribucion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
