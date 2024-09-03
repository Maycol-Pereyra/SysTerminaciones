namespace ProyectoIntegrador.Api.ViewModel
{
    public class RegistroVm
    {
        public int Id { get; set; }
        public int TipoRegistroId { get; set; }
        public string Descripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
