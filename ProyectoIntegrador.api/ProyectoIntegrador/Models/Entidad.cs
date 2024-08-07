namespace ProyectoIntegrador.Api.Models
{
    public class Entidad
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public int TipoIdentificacionId { get; set; }
        public string Identificacion { get; set; } = "";
        public string Correo { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Registro TipoIdentificacion { get; set; } = new Registro();
        public virtual List<EntidadDireccion> ListaEntidadDireccion { get; set; } = [];
        public virtual List<EntidadTelefono> ListaEntidadTelefono { get; set; } = [];
    }
}
