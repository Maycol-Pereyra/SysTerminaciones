using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class InventarioModelConfig
    {
        public static ModelBuilder ConfigurarInventarioModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Inventario>(etb =>
            {
                etb.ToTable("Inventario", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.AlmacenId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaModificacion)
                    .HasColumnType("datetime")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
