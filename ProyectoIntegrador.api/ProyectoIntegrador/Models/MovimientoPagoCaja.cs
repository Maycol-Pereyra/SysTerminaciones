namespace ProyectoIntegrador.Api.Models
{
    public class MovimientoPagoCaja
    {
        public int Id { get; set; }
        public int AperturaCajaId { get; set; }
        public int FacturaId { get; set; }
        public decimal Monto { get; set; }
        public DateTime FechaCreacion { get; set; }

        public virtual Factura Factura { get; set; } = new();
    }
}
