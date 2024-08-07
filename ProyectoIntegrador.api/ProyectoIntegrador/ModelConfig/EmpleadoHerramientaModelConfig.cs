using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EmpleadoHerramientaModelConfig
    {
        public static ModelBuilder ConfigurarEmpleadoHerramientaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmpleadoHerramienta>(etb =>
            {
                etb.ToTable("EmpleadoHerramienta", "dbo");

                etb.HasKey(e => new { e.EmpleadoId, e.HerramientaId});

                etb.Property(e => e.EmpleadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.HerramientaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaAsignacion)
                    .HasColumnType("datetime")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
