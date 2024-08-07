namespace ProyectoIntegrador.Api.ViewModel
{
    public class MovimientoPagoCajaVm
    {
        public int Id { get; set; }
        public int AperturaCajaId { get; set; }
        public int FacturaId { get; set; }
        public int MedioPagoId { get; set; }
        public decimal Monto { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
