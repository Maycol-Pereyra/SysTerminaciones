using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EntidadDireccionModelConfig
    {
        public static ModelBuilder ConfigurarEntidadDireccionModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EntidadDireccion>(etb =>
            {
                etb.ToTable("EntidadDireccion", "dbo");

                etb.HasKey(e => new { e.EntidadId, e.DireccionId});

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.EntidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DireccionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.Direccion)
                    .WithMany()
                    .HasForeignKey(e => e.DireccionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
