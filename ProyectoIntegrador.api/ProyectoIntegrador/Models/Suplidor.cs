namespace ProyectoIntegrador.Api.Models
{
    public class Suplidor
    {
        public int Id { get; set; }
        public int EntidadId { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Entidad Entidad { get; set; }
    }
}
