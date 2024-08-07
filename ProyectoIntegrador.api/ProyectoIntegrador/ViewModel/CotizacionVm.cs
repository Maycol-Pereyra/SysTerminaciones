namespace ProyectoIntegrador.Api.ViewModel
{
    public class CotizacionVm
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNombre { get; set; } = "";
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

        //Datos de la direccion
        public string Calle { get; set; } = "";
        public string Casa { get; set; } = "";
        public string Referencia { get; set; } = "";
        public int PaisId { get; set; }
        public int ProvinciaId { get; set; }
        public int CiudadId { get; set; }
        public int SectorId { get; set; }

        public List<CotizacionDetalleVm> ListaDetalle { get; set; } = [];

    }
}
