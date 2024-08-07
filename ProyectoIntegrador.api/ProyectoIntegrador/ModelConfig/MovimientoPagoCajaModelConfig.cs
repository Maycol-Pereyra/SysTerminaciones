using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class MovimientoPagoCajaModelConfig
    {
        public static ModelBuilder ConfigurarMovimientoPagoCajaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovimientoPagoCaja>(etb =>
            {
                etb.ToTable("MovimientoPagoCaja", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.AperturaCajaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FacturaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Monto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.HasOne(e => e.Factura)
                    .WithMany()
                    .HasForeignKey(e => e.FacturaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
