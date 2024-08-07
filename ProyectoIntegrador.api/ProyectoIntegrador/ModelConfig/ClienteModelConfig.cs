using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ClienteModelConfig
    {
        public static ModelBuilder ConfigurarClienteModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(etb =>
            {
                etb.ToTable("Cliente", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TiempoCredito)
                    .HasColumnType("tinyint")
                    .IsRequired();

                etb.Property(e => e.LimiteCredito)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.FechaModificacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.Entidad)
                    .WithMany()
                    .HasForeignKey(e => e.Id)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
