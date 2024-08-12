using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;
using System.Numerics;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class VehiculoModelConfig
    {
        public static ModelBuilder ConfigurarVehiculoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Vehiculo>(etb =>
            {
                etb.ToTable("Vehiculo", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Marca)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.Modelo)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.AnoFabricacion)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Placa)
                    .HasColumnType("varchar(20)")
                    .IsRequired();

                etb.Property(e => e.ColorId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Kilometraje)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CapacidadCarga)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.UnidadCargaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaModificacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.Color)
                    .WithMany()
                    .HasForeignKey(e => e.ColorId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Estado)
                    .WithMany()
                    .HasForeignKey(e => e.EstadoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Unidad)
                    .WithMany()
                    .HasForeignKey(e => e.UnidadCargaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
