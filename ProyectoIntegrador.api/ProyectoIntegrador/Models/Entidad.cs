namespace ProyectoIntegrador.Api.Models
{
    public class Entidad
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public string Cedula { get; set; } = "";
        public string Rnc { get; set; } = "";
        public string Pasaporte { get; set; } = "";
        public string Correo { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual List<EntidadDireccion> ListaEntidadDireccion { get; set; } = [];
        public virtual List<EntidadTelefono> ListaEntidadTelefono { get; set; } = [];
    }
}
