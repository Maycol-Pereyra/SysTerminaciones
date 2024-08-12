namespace ProyectoIntegrador.Api.ViewModel
{
    public class FacturaDetalleVm
    {
        public int FacturaId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadProductoId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int TipoMedidaId { get; set; }
        public decimal Cantidad { get; set; }
        public int CantidadEntregada { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Impuesto { get; set; }
        public decimal Descuento { get; set; }
    }
}
