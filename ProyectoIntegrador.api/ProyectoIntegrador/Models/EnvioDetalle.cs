namespace ProyectoIntegrador.Api.Models
{
    public class EnvioDetalle
    {
        public int EnvioId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int Cantidad { get; set; }
        public int CantidadEntregada { get; set; }
        public int EstadoId { get; set; }
    }
}
