﻿namespace ProyectoIntegrador.Api.Models
{
    public class Unidad
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public string Abreviatura { get; set; } = "";
        public decimal Cantidad { get; set; }
        public DateTime FechaModificacion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
