namespace ProyectoIntegrador.Api.Models
{
    public class TipoProducto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public bool UsaMedidasProducto { get; set; }
        public bool UsaMedidasFactura { get; set; }
        public bool UsaInstalacion { get; set; }
        public decimal DescuentoCabezal { get; set; }
        public decimal DescuentoVidrioAncho { get; set; }
        public decimal DescuentoRiel { get; set; }
        public decimal DescuentoLlavinEnganche { get; set; }
        public decimal DescuentoVidrioAlto { get; set; }
        public decimal DescuentoLateral { get; set; }
        public int CantidadCabezal { get; set; }
        public int CantidadRiel { get; set; }
        public int CantidadLlavin { get; set; }
        public int CantidadEnganche { get; set; }
        public int CantidadLateral { get; set; }
        public int CantidadVidrio { get; set; }
    }
}
