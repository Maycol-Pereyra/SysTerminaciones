namespace ProyectoIntegrador.Api.ViewModel
{
    public class ConceptoVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public bool Accion { get; set; }
        public int CuentaContableId { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
