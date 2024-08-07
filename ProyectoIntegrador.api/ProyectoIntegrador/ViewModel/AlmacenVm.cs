namespace ProyectoIntegrador.Api.ViewModel
{
    public class AlmacenVm
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public int DireccionId { get; set; }
        public bool EstaActivo { get; set; }
    }
}
