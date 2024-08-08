namespace ProyectoIntegrador.Api.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public int EmpleadoId { get; set; }
        public int EntidadId { get; set; }
        public string Login { get; set; } = "";
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Empleado Empleado { get; set; } = new();
        public virtual Entidad Entidad { get; set; } = new();
        public virtual List<UsuarioPerfil> ListaUsuarioPerfil { get; set; } = new();
    }
}
