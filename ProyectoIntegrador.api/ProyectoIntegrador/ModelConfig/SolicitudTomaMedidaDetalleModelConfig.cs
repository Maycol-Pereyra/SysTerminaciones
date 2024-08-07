using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class SolicitudTomaMedidaDetalleModelConfig
    {
        public static ModelBuilder ConfigurarSolicitudTomaMedidaDetalleModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SolicitudTomaMedidaDetalle>(etb =>
            {
                etb.ToTable("SolicitudTomaMedidaDetalle", "dbo");

                etb.HasKey(e => new { e.SolicitudTomaMedidaId, e.TomaMedidaId});

                etb.Property(e => e.SolicitudTomaMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TomaMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.HasOne(e => e.SolicitudTomaMedida)
                    .WithMany()
                    .HasForeignKey(e => e.SolicitudTomaMedidaId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.TomaMedida)
                    .WithMany()
                    .HasForeignKey(e => e.TomaMedidaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
