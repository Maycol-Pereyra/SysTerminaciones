namespace ProyectoIntegrador.Api.Models
{
    public class EntidadTelefono
    {
        public string Descripcion { get; set; } = "";
        public string Telefono { get; set; } = "";
        public int EntidadId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Entidad Entidad { get; set; } = new();
    }
}
