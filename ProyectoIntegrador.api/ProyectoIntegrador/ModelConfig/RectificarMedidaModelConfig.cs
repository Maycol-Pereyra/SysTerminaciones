using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class RectificarMedidaModelConfig
    {
        public static ModelBuilder ConfigurarRectificarMedidaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RectificarMedida>(etb =>
            {
                etb.ToTable("RectificarMedida", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.SolicitudTomaMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EmpleadoAsignadoId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.VehiculoAsignadoId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.FechaCompromisoRectificarMedida)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaRectificarMedida)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
