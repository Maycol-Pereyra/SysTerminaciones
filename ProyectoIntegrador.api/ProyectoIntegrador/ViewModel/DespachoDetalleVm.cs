namespace ProyectoIntegrador.Api.ViewModel
{
    public class DespachoDetalleVm
    {
        public int DespachoId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int Cantidad { get; set; }
        public int CantidadDespachada { get; set; }
        public string Nota { get; set; } = "";
        public int EstadoId { get; set; }
    }
}
