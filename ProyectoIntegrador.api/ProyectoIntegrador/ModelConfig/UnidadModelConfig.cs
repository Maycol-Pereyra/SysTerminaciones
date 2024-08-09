using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class UnidadModelConfig
    {
        public static ModelBuilder ConfigurarUnidadModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Unidad>(etb =>
            {
                etb.ToTable("Unidad", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.Abreviatura)
                    .HasColumnType("varchar(5)")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("decimal(18,2)")
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
            });

            return modelBuilder;
        }
    }
}
