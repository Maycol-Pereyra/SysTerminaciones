namespace ProyectoIntegrador.Api.Models
{
    public class TipoRegistro
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
