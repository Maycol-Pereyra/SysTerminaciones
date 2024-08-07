using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class SolicitudTomaMedidaModelConfig
    {
        public static ModelBuilder ConfigurarSolicitudTomaMedidaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SolicitudTomaMedida>(etb =>
            {
                etb.ToTable("SolicitudTomaMedida", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ClienteId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DireccionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EmpleadoAsignadoId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.VehiculoAsignadoId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.FechaCompromisoTomaMedida)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaTomaMedida)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.HasOne(e => e.Cliente)
                    .WithMany()
                    .HasForeignKey(e => e.ClienteId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Direccion)
                    .WithMany()
                    .HasForeignKey(e => e.DireccionId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.EmpleadoAsignado)
                    .WithMany()
                    .HasForeignKey(e => e.EmpleadoAsignadoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.VehiculoAsignado)
                    .WithMany()
                    .HasForeignKey(e => e.VehiculoAsignadoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Estado)
                    .WithMany()
                    .HasForeignKey(e => e.EstadoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasMany(e => e.ListaDetalle)
                    .WithOne(x => x.SolicitudTomaMedida)
                    .HasForeignKey(x => x.SolicitudTomaMedidaId)
                    .OnDelete(DeleteBehavior.Cascade);

            });

            return modelBuilder;
        }
    }
}
