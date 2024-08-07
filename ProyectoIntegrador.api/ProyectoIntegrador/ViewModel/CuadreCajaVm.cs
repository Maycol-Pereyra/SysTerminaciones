using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.Api.ViewModel
{
    public class CuadreCajaVm
    {
        public int Id { get; set; }
        public int CajaId { get; set; }
        public int TurnoId { get; set; }
        public decimal MontoEfectivo { get; set; }
        public decimal MontoTarjeta { get; set; }
        public decimal MontoOtro { get; set; }
        public decimal MontoTotal { get; set; }
        public int UsuarioCuadreId { get; set; }

    }
}
