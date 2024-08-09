using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ProyectoIntegrador.Api.Models
{
    public class CargamentoVehiculo
    {
        public int Id { get; set; }
        public int DistribucionEnvioId { get; set; }
        public int VehiculoId { get; set; }
        public int EnvioId { get; set; }
        public int ProductoId { get; set; }
        public int UnidadId { get; set; }
        public decimal MedidaAncho { get; set; }
        public decimal MedidaAlto { get; set; }
        public int Cantidad { get; set; }

        public virtual Vehiculo Vehiculo { get; set; }
        public virtual Envio Envio { get; set; }
        public virtual Producto Producto { get; set; }
        public virtual Unidad Unidad { get; set; }
    }
}
