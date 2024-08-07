using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EnvioDetalleModelConfig
    {
        public static ModelBuilder ConfigurarEnvioDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EnvioDetalle>(etb =>
            {
                etb.ToTable("EnvioDetalle", "dbo");

                etb.HasKey(e => new { e.EnvioId, e.ProductoId, e.MedidaAncho, e.MedidaAlto });
                
                etb.Property(e => e.EnvioId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaAncho)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.MedidaAlto)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadEntregada)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
