using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class CompraModelConfig
    {
        public static ModelBuilder ConfigurarCompraModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Compra>(etb =>
            {
                etb.ToTable("Compra", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.SuplidorId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.NumeroFactura)
                    .HasColumnType("varchar(15)")
                    .IsRequired();

                etb.Property(e => e.MedioPagoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Monto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.BalancePendiente)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Descuento)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Impuesto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.TipoComprobanteId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Comprobante)
                    .HasColumnType("varchar(8)")
                    .IsRequired();

                etb.Property(e => e.Concepto)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.UsuarioCreacionId)
                    .HasColumnType("int")
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

                etb.HasOne(e => e.Suplidor)
                    .WithMany()
                    .HasForeignKey(e => e.SuplidorId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.MedioPago)
                    .WithMany()
                    .HasForeignKey(e => e.MedioPagoId)
                    .OnDelete(DeleteBehavior.Restrict);


                etb.HasOne(e => e.TipoComprobante)
                    .WithMany()
                    .HasForeignKey(e => e.TipoComprobanteId)
                    .OnDelete(DeleteBehavior.Restrict);


                etb.HasOne(e => e.Usuario)
                    .WithMany()
                    .HasForeignKey(e => e.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
