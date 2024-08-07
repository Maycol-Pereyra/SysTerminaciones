using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DespachoModelConfig
    {
        public static ModelBuilder ConfigurarDespachoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Despacho>(etb =>
            {
                etb.ToTable("Despacho", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FacturaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaDespacho)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaEntrega)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaInstalacion)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
