namespace ProyectoIntegrador.Api.Models
{
    public class DesgloseCorrederaDetalle
    {
        public int DesgloseCorrederaId { get; set; }
        public int UnidadId { get; set; }
        public int ProductoId { get; set; }
        public int CantidadProducto { get; set; }
        public decimal MedidaAnchoProducto { get; set; }
        public decimal MedidaAltoProducto { get; set; }
        public int CantidadCabezal { get; set; }
        public int CantidadCabezalPendiente { get; set; }
        public decimal MedidaCabezal { get; set; }
        public int CantidadRiel { get; set; }
        public int CantidadRielPendiente { get; set; }
        public decimal MedidaRiel { get; set; }
        public int CantidadLlavin { get; set; }
        public int CantidadLlavinPendiente { get; set; }
        public decimal MedidaLlavin { get; set; }
        public int CantidadEnganche { get; set; }
        public int CantidadEnganchePendiente { get; set; }
        public decimal MedidaEnganche { get; set; }
        public int CantidadLateral { get; set; }
        public int CantidadLateralPendiente { get; set; }
        public decimal MedidaLateral { get; set; }
        public int CantidadVidrio { get; set; }
        public int CantidadVidrioPendiente { get; set; }
        public decimal MedidaVidrioAncho { get; set; }
        public decimal MedidaVidrioAlto { get; set; }
        public string Nota { get; set; } = "";
        public int EstadoId { get; set; }

        public virtual DesgloseCorredera DesgloseCorredera { get; set; } = new();
    }
}
