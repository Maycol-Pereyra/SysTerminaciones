﻿namespace ProyectoIntegrador.Api.ViewModel
{
    public class ProvinciaVm
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int PaisId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }
    }
}
