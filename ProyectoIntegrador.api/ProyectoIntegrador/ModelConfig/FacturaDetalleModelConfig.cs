using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class FacturaDetalleModelConfig
    {
        public static ModelBuilder ConfigurarFacturaDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FacturaDetalle>(etb =>
            {
                etb.ToTable("FacturaDetalle", "dbo");

                etb.HasKey(e => new { e.FacturaId, e.ProductoId });

                etb.Property(e => e.FacturaId)
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

                etb.Property(e => e.UnidadMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadEntregada)
                    .HasColumnType("decimal(10, 6)")
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
            });

            return modelBuilder;
        }
    }
}
