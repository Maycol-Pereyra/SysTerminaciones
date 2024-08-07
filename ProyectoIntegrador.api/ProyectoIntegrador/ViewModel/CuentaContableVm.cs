namespace ProyectoIntegrador.Api.ViewModel
{
    public class CuentaContableVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public bool Origen { get; set; }
        public int CuentaContableAcumularId { get; set; }
        public int ClasificacionContableId { get; set; }
        public bool CuentaControl { get; set; }
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
