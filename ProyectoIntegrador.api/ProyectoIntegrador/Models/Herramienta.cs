﻿namespace ProyectoIntegrador.Api.Models
{
    public class Herramienta
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int EstadoId { get; set; }

        public virtual Defecto Estado { get; set; }
    }
}
