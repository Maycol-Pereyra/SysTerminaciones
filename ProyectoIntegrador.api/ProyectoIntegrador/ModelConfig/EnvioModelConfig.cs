using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EnvioModelConfig
    {
        public static ModelBuilder ConfigurarEnvioModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Envio>(etb =>
            {
                etb.ToTable("Envio", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DespachoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaEntrega)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaEntregaCompromiso)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
