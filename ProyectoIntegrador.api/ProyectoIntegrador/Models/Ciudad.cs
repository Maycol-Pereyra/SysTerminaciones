using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;

namespace ProyectoIntegrador.Api.Models
{
    public class Ciudad
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = "";
        public int ProvinciaId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool EstaActivo { get; set; }

        public virtual Provincia Provincia { get; set; }
    }
}
