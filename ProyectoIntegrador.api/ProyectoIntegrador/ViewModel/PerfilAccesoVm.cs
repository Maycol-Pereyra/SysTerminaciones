namespace ProyectoIntegrador.Api.ViewModel
{
    public class PerfilAccesoVm
    {
        public int PerfilId { get; set; }
        public string AccesoId { get; set; } = "";
        public bool Seleccionado { get; set; }
        public string Modulo { get; set; } = "";
        public string Opcion { get; set; } = "";
        public string Permiso { get; set; } = "";
        public string Descripcion { get; set; } = "";
    }
}
