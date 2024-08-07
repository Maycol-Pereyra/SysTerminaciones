namespace ProyectoIntegrador.Api.Models
{
    public class EntidadDireccion
    {
        public string Descripcion { get; set; } = "";
        public int EntidadId { get; set; }
        public int DireccionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Entidad Entidad { get; set; } = new();
        public virtual Direccion Direccion { get; set; } = new();
    }
}
