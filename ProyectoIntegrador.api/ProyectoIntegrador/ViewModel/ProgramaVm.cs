namespace ProyectoIntegrador.Api.ViewModel
{
    public class ProgramaVm
    {
        public int Id { get; set; }
        public int ModuloId { get; set; }
        public int TipoProgramaId { get; set; }
        public string Descripcion { get; set; } = "";
        public string Ruta { get; set; } = "";
        public string Icono { get; set; } = "";
        public byte Orden { get; set; }
    }
}
