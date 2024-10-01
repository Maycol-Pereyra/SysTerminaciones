using ProyectoIntegrador.Api._Core.Entidades;

namespace ProyectoIntegrador.Api.RequestParameters
{
    public class DireccionParameters : RequestParameter
    {
        public int Id { get; set; }
        public int EntidadId { get; set; }
        public int ClienteId { get; set; }
        public int SuplidorId { get; set; }
        public int EmpleadoId { get; set; }
        public int UsuarioId { get; set; }
    }
}
