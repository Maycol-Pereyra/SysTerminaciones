namespace ProyectoIntegrador.Api.ViewModel
{
    public class ProductoVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public string DescripcionCliente { get; set; } = "";
        public int CategoriaId { get; set; }
        public int SuplidorId { get; set; }
        public int TipoProductoId { get; set; }
        public int? ColorId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public List<ProductoUnidadVm> ListaProductoUnidad { get; set; } = [];
    }
}
