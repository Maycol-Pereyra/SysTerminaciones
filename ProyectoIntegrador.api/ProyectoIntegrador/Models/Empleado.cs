namespace ProyectoIntegrador.Api.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        public int EntidadId { get; set; }
        public decimal Sueldo { get; set; }
        public int? PosicionId { get; set; }
        public int? DepartamentoId { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime? FechaTerminoContrato { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Entidad Entidad { get; set; }
        public virtual Registro Posicion { get; set; }
        public virtual Registro Departamento { get; set; }
    }
}
