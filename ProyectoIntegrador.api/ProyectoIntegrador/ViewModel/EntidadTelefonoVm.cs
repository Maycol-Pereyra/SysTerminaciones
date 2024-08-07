namespace ProyectoIntegrador.Api.ViewModel
{
    public class EntidadTelefonoVm
    {
        public string Descripcion { get; set; } = "";
        public string Telefono { get; set; } = "";
        public int EntidadId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
