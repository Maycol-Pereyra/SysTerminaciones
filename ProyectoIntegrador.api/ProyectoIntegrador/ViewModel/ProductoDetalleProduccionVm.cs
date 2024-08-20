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
    }
}
