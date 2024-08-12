namespace ProyectoIntegrador.Api.ViewModel
{
    public class EntidadDireccionVm
    {
        public int Id { get; set; }
        public int EntidadId { get; set; }
        public string Descripcion { get; set; } = "";
        public string Calle { get; set; } = "";
        public string Casa { get; set; } = "";
        public string Referencia { get; set; } = "";
        public int PaisId { get; set; }
        public int ProvinciaId { get; set; }
        public int CiudadId { get; set; }
        public int SectorId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
