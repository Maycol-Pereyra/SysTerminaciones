namespace ProyectoIntegrador.Api.ViewModel
{
    public class SolicitudTomaMedidaVm
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNombre { get; set; } = "";
        public int DireccionId { get; set; }
        public int? EmpleadoAsignadoId { get; set; }
        public string EmpleadoAsignadoNombre { get; set; } = "";
        public int? VehiculoAsignadoId { get; set; }
        public string VehiculoAsignadoDescripcion { get; set; } = "";
        public DateTime? FechaCompromisoTomaMedida { get; set; } = null;
        public DateTime? FechaTomaMedida { get; set; } = null;
        public DateTime FechaCreacion { get; set; }
        public int EstadoId { get; set; }
        public string EstadoDescripcion { get; set; } = "";

        //Datos de la direccion
        public string Calle { get; set; } = "";
        public string Casa { get; set; } = "";
        public string Referencia { get; set; } = "";
        public int PaisId { get; set; }
        public int ProvinciaId { get; set; }
        public int CiudadId { get; set; }
        public int SectorId { get; set; }

        public virtual List<SolicitudTomaMedidaDetalleVm> ListaDetalle { get; set; } = [];
    }
}
