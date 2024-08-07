namespace ProyectoIntegrador.Api.Models
{
    public class PerfilPermiso
    {
        public int PerfilId { get; set; }
        public int PermisoId { get; set; }

        public virtual Perfil Perfil { get; set; } = new();
    }
}
