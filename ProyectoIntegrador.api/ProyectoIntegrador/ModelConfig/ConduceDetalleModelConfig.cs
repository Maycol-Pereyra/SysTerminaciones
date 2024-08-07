using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ConduceDetalleModelConfig
    {
        public static ModelBuilder ConfigurarConduceDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ConduceDetalle>(etb =>
            {
                etb.ToTable("ConduceDetalle", "dbo");

                etb.HasKey(e => new { e.ConduceId, e.ProductoId});

                etb.Property(e => e.ConduceId)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
