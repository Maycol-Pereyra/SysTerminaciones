namespace ProyectoIntegrador.Api.Models
{
    public class AperturaCaja
    {
        public int Id { get; set; }
        public int CajaId { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaApertura { get; set; }
        public DateTime? FechaCierre { get; set; }
        public int TurnoId { get; set; }
        public bool CuadroCaja { get; set; }

        public virtual Caja Caja { get; set; } = new Caja();
        public virtual Usuario Usuario { get; set; } = new Usuario();
        public virtual Registro Registro { get; set; } = new Registro();
    }
}
