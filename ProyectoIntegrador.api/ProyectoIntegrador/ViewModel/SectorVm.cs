namespace ProyectoIntegrador.Api.ViewModel
{
    public class SectorVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int CiudadId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
