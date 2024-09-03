namespace ProyectoIntegrador.Api.Models
{
    public class Defecto
    {
        public int Id { get; set; }
        public int TipoDefectoId { get; set; }
        public string Descripcion { get; set; } = "";

        public virtual TipoDefecto TipoDefecto { get; set; }
    }
}
