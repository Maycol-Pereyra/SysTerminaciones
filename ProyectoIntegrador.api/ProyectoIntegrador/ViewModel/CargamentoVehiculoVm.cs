namespace ProyectoIntegrador.Api.ViewModel
{
    public class CargamentoVehiculoVm
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
    }
}
