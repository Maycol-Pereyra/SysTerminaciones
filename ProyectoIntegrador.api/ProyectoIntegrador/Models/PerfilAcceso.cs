namespace ProyectoIntegrador.Api.Models
{
    public class PerfilAcceso
    {
        public int PerfilId { get; set; }
        public string AccesoId { get; set; } = "";

        public virtual Perfil Perfil { get; set; } = new();
    }
}
