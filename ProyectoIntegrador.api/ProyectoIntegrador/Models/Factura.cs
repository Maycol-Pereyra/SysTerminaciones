namespace ProyectoIntegrador.Api.Models
{
    public class Factura
    {
        public int Id { get; set; }
        public int TipoFacturaId { get; set; }
        public int ClienteId { get; set; }
        public string NumeroFactura { get; set; } = "";
        public int MedioPagoId { get; set; }
        public decimal Monto { get; set; }
        public decimal BalancePendiente { get; set; }
        public decimal Descuento { get; set; }
        public decimal Impuesto { get; set; }
        public int TipoComprobanteId { get; set; }
        public string Comprobante { get; set; } = "";
        public string Nota { get; set; } = "";
        public bool LlevaEnvio { get; set; }
        public bool LlevaInstalacion { get; set; }
        public int? DireccionId { get; set; } = null;
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Cliente Cliente { get; set; } = new();
        public virtual Direccion Direccion { get; set; } = new();
        public virtual List<FacturaDetalle> ListaDetalle { get; set; } = [];
    }
}
