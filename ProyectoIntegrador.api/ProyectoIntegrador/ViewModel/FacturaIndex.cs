namespace ProyectoIntegrador.Api.ViewModel
{
    public class FacturaIndex
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNombre { get; set; } = "";
        public string NumeroFactura { get; set; } = "";
        public decimal Monto { get; set; }
        public int TipoComprobanteId { get; set; }
        public string Comprobante { get; set; } = "";
        public bool LlevaEnvio { get; set; }
        public bool LlevaInstalacion { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int EstadoId { get; set; }
        public string EstadoDescripcion { get; set; } = "";
    }
}
