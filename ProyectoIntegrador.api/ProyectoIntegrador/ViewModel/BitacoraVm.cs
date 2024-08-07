namespace ProyectoIntegrador.Api.ViewModel
{
    public class BitacoraVm
    {
        public int Id { get; set; }
        public string Accion { get; set; } = "";
        public string Tabla { get; set; } = "";
        public string Campo { get; set; } = "";
        public string ValorAnterior { get; set; } = "";
        public string ValorActual { get; set; } = "";
        public int UsuarioCreacionId { get; set; }
        public DateTime FechaCreacion { get; set; }
    }
}
