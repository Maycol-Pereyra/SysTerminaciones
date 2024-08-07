using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class BitacoraModelConfig
    {
        public static ModelBuilder ConfigurarBitacoraModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bitacora>(etb =>
            {
                etb.ToTable("Bitacora", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Accion)
                    .HasColumnType("varchar(10)")
                    .IsRequired();

                etb.Property(e => e.Tabla)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Campo)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.ValorAnterior)
                    .HasColumnType("varchar(max)")
                    .IsRequired(false);

                etb.Property(e => e.ValorActual)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.UsuarioCreacionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.HasOne(e => e.Usuario)
                    .WithMany()
                    .HasForeignKey(e => e.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Usuario)
                    .WithMany()
                    .HasForeignKey(e => e.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
