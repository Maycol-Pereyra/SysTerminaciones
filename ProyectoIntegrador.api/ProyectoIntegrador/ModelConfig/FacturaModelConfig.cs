using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class FacturaModelConfig
    {
        public static ModelBuilder ConfigurarFacturaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Factura>(etb =>
            {
                etb.ToTable("Factura", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ClienteId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.NumeroFactura)
                    .HasColumnType("varchar(15)")
                    .IsRequired();

                etb.Property(e => e.MedioPagoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Monto)
                    .HasColumnType("decimal(16, 2)")
                    .IsRequired();

                etb.Property(e => e.BalancePendiente)
                    .HasColumnType("decimal(16, 2)")
                    .IsRequired();

                etb.Property(e => e.Descuento)
                    .HasColumnType("decimal(16, 2)")
                    .IsRequired();

                etb.Property(e => e.Impuesto)
                    .HasColumnType("decimal(16, 2)")
                    .IsRequired();

                etb.Property(e => e.TipoComprobanteId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Comprobante)
                    .HasColumnType("varchar(8)")
                    .IsRequired();

                etb.Property(e => e.Nota)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.LlevaEnvio)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.LlevaInstalacion)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.DireccionId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.UsuarioCreacionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.HasOne(e => e.UsuarioCreacion)
                    .WithMany()
                    .HasForeignKey(e => e.UsuarioCreacionId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Cliente)
                    .WithMany()
                    .HasForeignKey(e => e.ClienteId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Direccion)
                    .WithMany()
                    .HasForeignKey(e => e.DireccionId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Telefono)
                    .WithMany()
                    .HasForeignKey(e => e.TelefonoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Estado)
                    .WithMany()
                    .HasForeignKey(e => e.EstadoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasMany(e => e.ListaDetalle)
                    .WithOne(x => x.Factura)
                    .HasForeignKey(e => e.FacturaId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            return modelBuilder;
        }
    }
}
