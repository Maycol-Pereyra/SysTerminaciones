namespace ProyectoIntegrador.Api.Models
{
    public class Permiso
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public string Codigo { get; set; } = "";
        public int ProgramaId { get; set; }
    }
}
