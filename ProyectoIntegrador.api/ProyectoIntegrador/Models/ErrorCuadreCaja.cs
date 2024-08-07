namespace ProyectoIntegrador.Api.Models
{
    public class ErrorCuadreCaja
    {
        public int Id { get; set; }
        public int AperturaCajaId { get; set; }
        public int UsuarioCuadreId { get; set; }
        public decimal Monto { get; set; }
    }
}
