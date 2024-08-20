namespace ProyectoIntegrador.Api.ViewModel
{
    public class UsuarioPerfilVm
    {
        public int UsuarioId { get; set; }
        public int PerfilId { get; set; }
        public string PerfilDescripcion { get; set; } = "";
        public bool Seleccionado { get; set; }
    }
}
