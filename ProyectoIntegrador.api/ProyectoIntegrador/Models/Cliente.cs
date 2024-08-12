namespace ProyectoIntegrador.Api.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public int EntidadId { get; set; }
        public int TiempoCredito { get; set; }
        public decimal LimiteCredito { get; set; }
        public string Correo { get; set; } = "";
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Entidad Entidad { get; set; }
    }
}
