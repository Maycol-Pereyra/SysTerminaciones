﻿namespace ProyectoIntegrador.Api.Models
{
    public class Provincia
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int PaisId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Pais Pais { get; set; }
    }
}
