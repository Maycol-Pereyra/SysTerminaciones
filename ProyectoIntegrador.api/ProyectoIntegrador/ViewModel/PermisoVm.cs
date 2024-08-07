namespace ProyectoIntegrador.Api.ViewModel
{
    public class PermisoVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public string Codigo { get; set; } = "";
        public int ProgramaId { get; set; }
    }
}
