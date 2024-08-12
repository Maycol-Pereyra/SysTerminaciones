namespace ProyectoIntegrador.Api.ViewModel
{
    public class SolicitudTomaMedidaDetalleVm
    {
        public int SolicitudTomaMedidaId { get; set; }
        public int TomaMedidaId { get; set; }

        //Datos de la toma de medida
        public int ProductoId { get; set; }
        public int UnidadProductoId { get; set; }
        public int Cantidad { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int TipoMedidaId { get; set; }
        public bool EsMedidaAproximada { get; set; }
        public string Nota { get; set; } = "";
    }
}
