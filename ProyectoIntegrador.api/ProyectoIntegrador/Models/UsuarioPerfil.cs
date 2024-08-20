namespace ProyectoIntegrador.Api.Models
{
    public class UsuarioPerfil
    {
        public int UsuarioId { get; set; }
        public int PerfilId { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.Now;

        public Usuario Usuario { get; set; }
    }
}
