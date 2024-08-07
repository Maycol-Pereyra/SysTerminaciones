using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ProductoUnidadModelConfig
    {
        public static ModelBuilder ConfigurarProductoUnidadModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProductoUnidad>(etb =>
            {
                etb.ToTable("ProductoUnidad", "dbo");

                etb.HasKey(e => new { e.ProductoId, e.UnidadId});

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.PrecioCompra)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.PrecioVenta)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.PrecioVentaInstalacion)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.HasOne(e => e.Producto)
                    .WithMany()
                    .HasForeignKey(e => e.ProductoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
