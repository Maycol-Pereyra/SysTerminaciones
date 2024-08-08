namespace ProyectoIntegrador.Api.ViewModel
{
    public class ClienteIndex
    {
        public int Id { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        //Propiedades que vienen de entidad
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public string Cedula { get; set; } = "";
        public string Rnc { get; set; } = "";
        public string Pasaporte { get; set; } = "";
        public string Correo { get; set; } = "";
    }
}
