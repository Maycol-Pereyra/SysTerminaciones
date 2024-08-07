namespace ProyectoIntegrador.Api.Models
{
    public class Perfil
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual List<PerfilPermiso> ListaDetalle { get; set; } = [];
    }
}
