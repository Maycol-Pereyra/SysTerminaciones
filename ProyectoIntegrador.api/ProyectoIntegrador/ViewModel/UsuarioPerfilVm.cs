namespace ProyectoIntegrador.Api.ViewModel
{
    public class UsuarioPerfilVm
    {
        public int UsuarioId { get; set; }
        public int PerfilId { get; set; }
        public DateTime FechaCreacion { get; set; }

        public virtual UsuarioVm Usuario { get; set; }
    }
}
