using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class CompraDetalleModelConfig
    {
        public static ModelBuilder ConfigurarCompraDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CompraDetalle>(etb =>
            {
                etb.ToTable("CompraDetalle", "dbo");

                etb.HasKey(e => new { e.CompraId, e.ProductoId, e.MedidaAncho, e.MedidaAlto });

                etb.Property(e => e.CompraId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaAncho)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.MedidaAlto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.UnidadMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.CantidadRecibida)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.PrecioUntario)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Impuesto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Descuento)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.HasOne(e => e.Compra)
                    .WithMany()
                    .HasForeignKey(e => e.CompraId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Producto)
                    .WithMany()
                    .HasForeignKey(e => e.ProductoId)
                    .OnDelete(DeleteBehavior.Restrict);


                etb.HasOne(e => e.UnidadProducto)
                    .WithMany()
                    .HasForeignKey(e => e.UnidadProductoId)
                    .OnDelete(DeleteBehavior.Restrict);


                etb.HasOne(e => e.UnidadMedida)
                    .WithMany()
                    .HasForeignKey(e => e.UnidadMedidaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
