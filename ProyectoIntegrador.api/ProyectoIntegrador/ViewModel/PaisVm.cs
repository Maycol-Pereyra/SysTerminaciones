﻿namespace ProyectoIntegrador.Api.ViewModel
{
    public class PaisVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public DateTime? FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
