using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace ProyectoIntegrador.Api.Models
{
    public class Almacen
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = "";
        public int DireccionId { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Direccion Direccion { get; set; }
    }
}
