namespace ProyectoIntegrador.ViewModel
{
    public class ProductoDetalleProduccionVm
    {
        public int ProductoId { get; set; }
        public int ProductoProduccionId { get; set; }
        public string ProductoProduccionDescripcion { get; set; } = "";
        public int UnidadProduccionId { get; set; }
        public string UnidadProduccionDescripcion { get; set; } = "";
        public int Cantidad { get; set; }
        public decimal Descuento { get; set; }
        public int Division { get; set; }
        public int TipoId { get; set; }
        public string TipoDescripcion { get; set; } = "";
    }
}
