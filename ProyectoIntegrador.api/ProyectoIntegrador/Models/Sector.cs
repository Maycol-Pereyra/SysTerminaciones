namespace ProyectoIntegrador.Api.Models
{
    public class Sector
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public int CiudadId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
