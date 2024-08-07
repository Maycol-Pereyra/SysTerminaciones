namespace ProyectoIntegrador.Api.ViewModel
{
    public class ClasificacionContableVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
