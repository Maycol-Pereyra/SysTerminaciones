using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class CotizacionDetalleModelConfig
    {
        public static ModelBuilder ConfigurarCotizacionDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CotizacionDetalle>(etb =>
            {
                etb.ToTable("CotizacionDetalle", "dbo");

                etb.HasKey(e => new { e.CotizacionId, e.ProductoId, e.MedidaAncho, e.MedidaAlto });

                etb.Property(e => e.CotizacionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaAncho)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.MedidaAlto)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.TipoMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.PrecioUnitario)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Impuesto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Descuento)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.HasOne(e => e.UnidadProducto)
                    .WithMany()
                    .HasForeignKey(e => e.UnidadProductoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Producto)
                    .WithMany()
                    .HasForeignKey(e => e.ProductoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
