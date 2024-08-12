namespace ProyectoIntegrador.Api.ViewModel
{
    public class UsuarioVm
    {
        public int Id { get; set; }
        public int EntidadId { get; set; }
        public int? EmpleadoId { get; set; }
        public string Login { get; set; } = "";
        public string Password { get; set; } = "";
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
        public string Token { get; set; } = "";

        //Propiedades que vienen de entidad
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public string Cedula { get; set; } = "";
        public string Rnc { get; set; } = "";
        public string Pasaporte { get; set; } = "";
        public string Correo { get; set; } = "";


        public virtual List<UsuarioPerfilVm> ListaUsuarioPerfil { get; set; } = [];
        public virtual List<EntidadDireccionVm> ListaEntidadDireccion { get; set; } = [];
        public virtual List<EntidadTelefonoVm> ListaEntidadTelefono { get; set; } = [];
    }
}
