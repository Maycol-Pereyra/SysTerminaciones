namespace ProyectoIntegrador.Api.ViewModel
{
    public class FacturaVm
    {
        public int Id { get; set; }
        public int TipoFacturaId { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNombre { get; set; } = "";
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
        public string TelefonoDescripcion { get; set; } = "";
        public int UsuarioCreacionId { get; set; }
        public string UsuarioCreacionNombre { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public int EstadoId { get; set; }
        public string EstadoDescripcion { get; set; } = "";

        //Datos de la direccion
        public string Calle { get; set; } = "";
        public string Casa { get; set; } = "";
        public string Referencia { get; set; } = "";
        public int PaisId { get; set; }
        public string PaisDescripcion { get; set; } = "";
        public int ProvinciaId { get; set; }
        public string ProvinciaDescripcion { get; set; } = "";
        public int CiudadId { get; set; }
        public string CiudadDescripcion { get; set; } = "";
        public int SectorId { get; set; }
        public string SectorDescripcion { get; set; } = "";

        public virtual List<FacturaDetalleVm> ListaDetalle { get; set; } = [];
    }
}
