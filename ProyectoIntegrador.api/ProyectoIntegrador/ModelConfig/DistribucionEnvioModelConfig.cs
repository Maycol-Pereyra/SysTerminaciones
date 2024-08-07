using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DistribucionEnvioModelConfig
    {
        public static ModelBuilder ConfigurarDistribucionEnvioModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DistribucionEnvio>(etb =>
            {
                etb.ToTable("DistribucionEnvio", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaDistribucion)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
