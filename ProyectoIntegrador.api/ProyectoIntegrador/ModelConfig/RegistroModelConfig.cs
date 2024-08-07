using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class RegistroModelConfig
    {
        public static ModelBuilder ConfigurarRegistroModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Registro>(etb =>
            {
                etb.ToTable("Registro", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TipoRegistroId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.FechaModificacion)
                    .HasColumnType("datetiem")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetiem")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.TipoRegistro)
                    .WithMany()
                    .HasForeignKey(e => e.TipoRegistroId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
