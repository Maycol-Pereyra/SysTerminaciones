using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DistribucionEnvioVehiculoModelConfig
    {
        public static ModelBuilder ConfigurarDistribucionEnvioVehiculoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DistribucionEnvioVehiculo>(etb =>
            {
                etb.ToTable("DistribucionEnvioVehiculo", "dbo");

                etb.HasKey(e => new { e.DistribucionEnvioId, e.VehiculoId});

                etb.Property(e => e.DistribucionEnvioId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.VehiculoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ConductorId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
