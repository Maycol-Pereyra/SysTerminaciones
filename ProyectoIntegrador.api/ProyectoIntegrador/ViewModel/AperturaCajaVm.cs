namespace ProyectoIntegrador.Api.ViewModel
{
    public class AperturaCajaVm
    {
        public int Id { get; set; }
        public int CajaId { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaApertura { get; set; }
        public DateTime? FechaCierre { get; set; }
        public int TurnoId { get; set; }
        public bool CuadroCaja { get; set; }
    }
}
