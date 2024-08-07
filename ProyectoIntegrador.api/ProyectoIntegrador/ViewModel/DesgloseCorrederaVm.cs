namespace ProyectoIntegrador.Api.ViewModel
{
    public class DesgloseCorrederaVm
    {
        public int Id { get; set; }
        public string NumeroDesglose { get; set; } = "";
        public int? DespachoId { get; set; }
        public string Descripcion { get; set; } = "";
        public string Nota { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public int EstadoId { get; set; }
        public string EstadoDescripcion { get; set; } = "";

        public virtual List<DesgloseCorrederaDetalleVm> ListaDetalle { get; set; } = [];
    }
}
