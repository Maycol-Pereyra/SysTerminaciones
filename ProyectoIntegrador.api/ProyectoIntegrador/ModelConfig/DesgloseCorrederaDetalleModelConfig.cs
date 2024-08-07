using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DesgloseCorrederaDetalleModelConfig
    {
        public static ModelBuilder ConfigurarDesgloseCorrederaDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DesgloseCorrederaDetalle>(etb =>
            {
                etb.ToTable("DesgloseCorrederaDetalle", "dbo");

                etb.HasKey(e => new { e.DesgloseCorrederaId, e.ProductoId, e.MedidaAnchoProducto, e.MedidaAltoProducto });

                etb.Property(e => e.DesgloseCorrederaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadProducto)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaAnchoProducto)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.MedidaAltoProducto)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadCabezal)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadCabezalPendiente)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaCabezal)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadRiel)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadRielPendiente)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaRiel)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadLlavin)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadLlavinPendiente)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaLlavin)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadEnganche)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadEnganchePendiente)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaEnganche)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadLateral)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadLateralPendiente)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaLateral)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadVidrio)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadVidrioPendiente)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaVidrioAncho)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.MedidaVidrioAlto)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.Nota)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
