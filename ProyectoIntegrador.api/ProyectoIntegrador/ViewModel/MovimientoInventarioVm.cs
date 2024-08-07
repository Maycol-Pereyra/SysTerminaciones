namespace ProyectoIntegrador.Api.ViewModel
{
    public class MovimientoInventarioVm
    {
        public int Id { get; set; }
        public int TipoMovimientoId { get; set; }
        public int ProductoId { get; set; }
        public decimal Cantidad { get; set; }
        public int AlmacenOrigenId { get; set; }
        public int AlmacenDestinoId { get; set; }
        public string Nota { get; set; } = "";
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
