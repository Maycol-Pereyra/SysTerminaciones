using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.ViewModel
{
    public class VerificacionExistenciaDto
    {
        public int ProductoId { get; set; }
        public string ProductoDescripcion { get; set; } = "";
        public int TipoProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal Cantidad { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public decimal Descuento { get; set; }
        public int Division { get; set; }

        public TipoProductoVm TipoProducto { get; set; }
    }
}
