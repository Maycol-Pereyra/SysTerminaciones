using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EnsambladoDetalleModelConfig
    {
        public static ModelBuilder ConfigurarEnsambladoDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EnsambladoDetalle>(etb =>
            {
                etb.ToTable("EnsambladoDetalle", "dbo");

                etb.HasKey(e => new { e.EnsambladoId, e.ProductoId, e.MedidaAncho, e.MedidaAlto });

                etb.Property(e => e.EnsambladoId)
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

                etb.Property(e => e.CantidadPendiente)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EmpleadoAsignadoId)
                    .HasColumnType("int")
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
