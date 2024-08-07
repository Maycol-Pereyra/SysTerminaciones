﻿
namespace ProyectoIntegrador.Api.Models
{
    public class Producto
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

        public virtual Registro Categoria { get; set; } = new();
        public virtual TipoProducto TipoProducto { get; set; } = new();
        public virtual Registro Color { get; set; } = new();
        public virtual Suplidor Suplidor { get; set; } = new();

        public virtual List<ProductoUnidad> ListaProductoUnidad { get; set; } = [];
    }
}
