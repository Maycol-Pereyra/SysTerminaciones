﻿namespace ProyectoIntegrador.Api.Models
{
    public class SolicitudTomaMedidaDetalle
    {
        public int SolicitudTomaMedidaId { get; set; }
        public int TomaMedidaId { get; set; }

        public virtual SolicitudTomaMedida SolicitudTomaMedida { get; set; }
        public virtual TomaMedida TomaMedida { get; set; }
    }
}
