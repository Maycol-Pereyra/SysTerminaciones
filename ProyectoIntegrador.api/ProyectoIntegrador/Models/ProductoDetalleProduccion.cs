﻿using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.Models
{
    public class ProductoDetalleProduccion
    {
        public int ProductoId { get; set; }
        public int ProductoProduccionId { get; set; }
        public int UnidadProduccionId { get; set; }
        public int Cantidad { get; set; }
        public decimal Descuento { get; set; }
        public int Division { get; set; }
        public int TipoId { get; set; }

        public virtual Producto Producto { get; set; }
        public virtual Producto ProductoProduccion { get; set; }
        public virtual Unidad UnidadProduccion { get; set; }
        public virtual Defecto Tipo { get; set; }
    }
}
