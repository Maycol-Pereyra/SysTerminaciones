using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.Models
{
    public class ProductoDetalleProduccion
    {
        public int ProductoId { get; set; }
        public int ProductoProduccionId { get; set; }
        public int UnidadProduccionId { get; set; }
        public int Cantidad { get; set; }

        public virtual Producto Producto { get; set; }
        public virtual Producto ProductoProduccion { get; set; }
        public virtual Unidad UnidadProduccion { get; set; }
    }
}
