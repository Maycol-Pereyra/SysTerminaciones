namespace ProyectoIntegrador.Api.Models
{
    public class EntidadDireccion
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

        public virtual Entidad Entidad { get; set; }
        public virtual Pais Pais { get; set; }
        public virtual Provincia Provincia { get; set; }
        public virtual Ciudad Ciudad { get; set; }
        public virtual Sector Sector { get; set; }
    }
}
