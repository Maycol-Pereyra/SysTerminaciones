namespace ProyectoIntegrador.Api.Models
{
    public class Registro
    {
        public int Id { get; set; }
        public int TipoRegistroId { get; set; }
        public string Descripcion { get; set; } = "";
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual TipoRegistro TipoRegistro { get; set; }
    }
}
