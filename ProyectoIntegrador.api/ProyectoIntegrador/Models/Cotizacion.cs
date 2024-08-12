namespace ProyectoIntegrador.Api.Models
{
    public class Cotizacion
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public string NumeroCotizacion { get; set; } = "";
        public decimal Monto { get; set; }
        public decimal Descuento { get; set; }
        public decimal Impuesto { get; set; }
        public int TipoComprobanteId { get; set; }
        public string Comprobante { get; set; } = "";
        public string Nota { get; set; } = "";
        public bool LlevaEnvio { get; set; }
        public bool LlevaInstalacion { get; set; }
        public int UsuarioCreacionId { get; set; }
        public int? DireccionId { get; set; }
        public int? SolicitudTomaMedidaId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Cliente Cliente { get; set; }
        public virtual EntidadDireccion Direccion { get; set; }
        public virtual List<CotizacionDetalle> ListaDetalle { get; set; } = [];
    }
}
