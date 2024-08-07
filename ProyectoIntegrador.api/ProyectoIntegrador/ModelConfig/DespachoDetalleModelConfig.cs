using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DespachoDetalleModelConfig
    {
        public static ModelBuilder ConfigurarDespachoDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DespachoDetalle>(etb =>
            {
                etb.ToTable("DespachoDetalle", "dbo");

                etb.HasKey(e => new { e.DespachoId, e.ProductoId, e.MedidaAncho, e.MedidaAlto });

                etb.Property(e => e.DespachoId)
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

                etb.Property(e => e.CantidadDespachada)
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
