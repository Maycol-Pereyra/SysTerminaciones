namespace ProyectoIntegrador.Api.ViewModel
{
    public class EmpleadoVm
    {
        public int Id { get; set; }
        public decimal Sueldo { get; set; }
        public int? PosicionId { get; set; }
        public string PosicionDescripcion { get; set; } = "";
        public int? DepartamentoId { get; set; }
        public string DepartamentoDescripcion { get; set; } = "";
        public DateTime FechaIngreso { get; set; }
        public DateTime? FechaTerminoContrato { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }


        //Propiedades que vienen de entidad
        public string Nombre { get; set; } = "";
        public string Apellido { get; set; } = "";
        public int TipoIdentificacionId { get; set; }
        public string Identificacion { get; set; } = "";
        public string Correo { get; set; } = "";
        public List<EntidadDireccionVm> ListaEntidadDireccion { get; set; } = [];
        public List<EntidadTelefonoVm> ListaEntidadTelefono { get; set; } = [];
    }
}
