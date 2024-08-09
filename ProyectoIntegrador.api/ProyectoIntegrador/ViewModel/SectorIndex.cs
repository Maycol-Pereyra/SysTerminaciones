namespace ProyectoIntegrador.Api.ViewModel
{
    public class SectorIndex
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int CiudadId { get; set; }
        public string CiudadDescripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
