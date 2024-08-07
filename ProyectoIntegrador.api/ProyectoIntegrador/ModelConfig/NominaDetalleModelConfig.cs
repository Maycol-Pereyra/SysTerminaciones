using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class NominaDetalleModelConfig
    {
        public static ModelBuilder ConfigurarNominaDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NominaDetalle>(etb =>
            {
                etb.ToTable("NominaDetalle", "dbo");

                etb.HasKey(e => new { e.NominaId, e.EmpleadoId, e.ConceptoId});

                etb.Property(e => e.NominaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EmpleadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ConceptoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Monto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
