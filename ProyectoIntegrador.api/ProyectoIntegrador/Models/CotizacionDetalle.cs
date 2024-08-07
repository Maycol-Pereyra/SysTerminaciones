namespace ProyectoIntegrador.Api.Models
{
    public class CotizacionDetalle
    {
        public int CotizacionId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadProductoId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int UnidadMedidaId { get; set; }
        public decimal Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
        public decimal Impuesto { get; set; }
        public decimal Descuento { get; set; }

        public virtual Cotizacion Cotizacion { get; set; } = new();
    }
}
