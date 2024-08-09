namespace ProyectoIntegrador.Api.Models
{
    public class Compra
    {
        public int Id { get; set; }
        public int SuplidorId { get; set; }
        public string NumeroFactura { get; set; } = "";
        public int MedioPagoId { get; set; }
        public decimal Monto { get; set; }
        public decimal BalancePendiente { get; set; }
        public decimal Descuento { get; set; }
        public decimal Impuesto { get; set; }
        public int TipoComprobanteId { get; set; }
        public string Comprobante { get; set; } = "";
        public string Concepto { get; set; } = "";
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }


        public virtual Suplidor Suplidor { get; set; }
        public virtual Registro MedioPago { get; set; }
        public virtual Registro TipoComprobante { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
