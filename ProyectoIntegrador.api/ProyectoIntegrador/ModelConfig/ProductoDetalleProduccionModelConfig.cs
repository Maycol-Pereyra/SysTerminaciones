using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ProductoDetalleProduccionModelConfig
    {
        public static ModelBuilder ConfigurarProductoDetalleProduccionModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductoDetalleProduccion>(etb =>
            {
                etb.ToTable("ProductoDetalleProduccion", "dbo");

                etb.HasKey(e => new { e.ProductoId, e.ProductoProduccionId });

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoProduccionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadProduccionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.HasOne(e => e.ProductoProduccion)
                    .WithMany()
                    .HasForeignKey(e => e.ProductoProduccionId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.UnidadProduccion)
                    .WithMany()
                    .HasForeignKey(e => e.UnidadProduccionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
