namespace ProyectoIntegrador.Api.ViewModel
{
    public class PerfilVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual List<PerfilAccesoVm> ListaDetalle { get; set; } = [];
    }
}
