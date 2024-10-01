namespace ProyectoIntegrador.Api.Models
{
    public class Factura
    {
        public int Id { get; set; }
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
        public int TelefonoId { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int EstadoId { get; set; }

        public virtual Usuario UsuarioCreacion { get; set; }
        public virtual Cliente Cliente { get; set; }
        public virtual Defecto Estado { get; set; }
        public virtual EntidadDireccion Direccion { get; set; }
        public virtual EntidadTelefono Telefono { get; set; }
        public virtual List<FacturaDetalle> ListaDetalle { get; set; } = [];
    }
}
