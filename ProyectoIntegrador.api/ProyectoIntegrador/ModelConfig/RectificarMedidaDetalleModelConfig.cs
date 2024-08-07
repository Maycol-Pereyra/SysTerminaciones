using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class RectificarMedidaDetalleModelConfig
    {
        public static ModelBuilder ConfigurarRectificarMedidaDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RectificarMedidaDetalle>(etb =>
            {
                etb.ToTable("RectificarMedidaDetalle", "dbo");

                etb.HasKey(e => new { e.RectificarMedidaId, e.TomaMedidaId});

                etb.Property(e => e.RectificarMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TomaMedidaId)
                    .HasColumnType("varchar(50)")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
