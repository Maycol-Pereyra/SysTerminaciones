using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EntidadTelefonoModelConfig
    {
        public static ModelBuilder ConfigurarEntidadTelefonoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EntidadTelefono>(etb =>
            {
                etb.ToTable("EntidadTelefono", "dbo");

                etb.HasKey(e => new { e.EntidadId, e.Telefono});

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.Telefono)
                    .HasColumnType("varchar(10)")
                    .IsRequired();

                etb.Property(e => e.EntidadId)
                    .HasColumnType("int")
                    .IsRequired();

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
