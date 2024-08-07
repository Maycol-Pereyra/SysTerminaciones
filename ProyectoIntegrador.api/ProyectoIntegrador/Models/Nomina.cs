namespace ProyectoIntegrador.Api.Models
{
    public class Nomina
    {
        public int Id { get; set; }
        public int TipoNomina { get; set; }
        public DateTime FechaInicial { get; set; }
        public DateTime FechaFinal { get; set; }
        public int UsuarioCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
