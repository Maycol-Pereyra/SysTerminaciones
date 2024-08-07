namespace ProyectoIntegrador.Api.Models
{
    public class CuadreCaja
    {
        public int Id { get; set; }
        public int AperturaId { get; set; }
        public decimal MontoEfectivo { get; set; }
        public decimal MontoTarjeta { get; set; }
        public decimal MontoOtro { get; set; }
        public decimal MontoTotal { get; set; }
        public int UsuarioCuadreId { get; set; }
    }
}
