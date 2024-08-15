namespace ProyectoIntegrador.Api.ViewModel
{
    public class ProductoIndex
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int CategoriaId { get; set; }
        public string CategoriaDescripcion { get; set; } = "";
        public int TipoProductoId { get; set; }
        public string TipoProductoDescripcion { get; set; } = "";
        public int? ColorId { get; set; }
        public string ColorDescripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
