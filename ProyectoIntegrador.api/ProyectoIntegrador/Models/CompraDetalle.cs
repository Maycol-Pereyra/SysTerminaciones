﻿using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.Api.Models
{
    public class CompraDetalle
    {
        public int CompraId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadProductoId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int TipoMedidaId { get; set; }
        public decimal Cantidad { get; set; }
        public decimal CantidadRecibida { get; set; }
        public decimal PrecioUntario { get; set; }
        public decimal Impuesto { get; set; }
        public decimal Descuento { get; set; }


        public virtual Compra Compra { get; set; }
        public virtual Producto Producto { get; set; }
        public virtual Unidad UnidadProducto { get; set; }
        public virtual Unidad UnidadMedida { get; set; }
    }
}
