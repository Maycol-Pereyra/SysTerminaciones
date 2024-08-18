using ProyectoIntegrador.Api._Core.Entidades;

namespace ProyectoIntegrador.Api.RequestParameters
{
    public class ProductoParameters : RequestParameter
    {
        public int ProductoId { get; set; }
        public bool CargarSoloUnidadVenta { get; set; }
        public bool CargarSoloUnidadCompra { get; set; }
    }
}
