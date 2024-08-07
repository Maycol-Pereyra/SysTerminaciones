namespace ProyectoIntegrador.Api.ViewModel
{
    public class UsuarioIndex
    {
        public int Id { get; set; }
        public string Login { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        //Propiedades que vienen de entidad
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public int TipoIdentificacionId { get; set; }
        public string Identificacion { get; set; } = "";
        public string Correo { get; set; } = "";
    }
}
