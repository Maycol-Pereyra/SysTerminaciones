namespace ProyectoIntegrador.Api.ViewModel
{
    public class CiudadIndex
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int ProvinciaId { get; set; }
        public string ProvinciaDescripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
