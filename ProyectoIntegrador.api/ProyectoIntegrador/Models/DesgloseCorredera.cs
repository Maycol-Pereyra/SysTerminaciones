namespace ProyectoIntegrador.Api.Models
{
    public class DesgloseCorredera
    {
        public int Id { get; set; }
        public string NumeroDesglose { get; set; } = "";
        public int? DespachoId { get; set; }
        public string Descripcion { get; set; } = "";
        public string Nota { get; set; } = "";
        public DateTime FechaCreacion { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public int EstadoId { get; set; }

        public virtual Despacho Despacho { get; set; } = new();
        public virtual Registro Estado { get; set; } = new();
        public virtual List<DesgloseCorrederaDetalle> ListaDetalle { get; set; } = [];
    }
}
