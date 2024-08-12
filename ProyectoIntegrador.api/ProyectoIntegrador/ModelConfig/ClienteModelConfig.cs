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

                etb.Property(e => e.EntidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TiempoCredito)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.LimiteCredito)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Correo)
                    .HasColumnType("varchar(100)")
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
                    .HasForeignKey(e => e.EntidadId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
