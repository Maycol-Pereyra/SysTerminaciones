namespace ProyectoIntegrador.Api.ViewModel
{
    public class TomaMedidaVm
    {
        public int Id { get; set; }
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
