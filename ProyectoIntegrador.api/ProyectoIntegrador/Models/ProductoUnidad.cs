namespace ProyectoIntegrador.Api.Models
{
    public class ProductoUnidad
    {
        public int ProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal PrecioVenta { get; set; }
        public decimal PrecioVentaInstalacion { get; set; }

        public virtual Producto Producto { get; set; }
        public virtual Unidad Unidad { get; set; }
    }
}
