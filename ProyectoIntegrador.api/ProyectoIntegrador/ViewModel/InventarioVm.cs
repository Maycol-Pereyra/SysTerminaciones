﻿namespace ProyectoIntegrador.Api.ViewModel
{
    public class InventarioVm
    {
        public int Id { get; set; }
        public int AlmacenId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int EstadoId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaModificacion { get; set; }
    }
}
