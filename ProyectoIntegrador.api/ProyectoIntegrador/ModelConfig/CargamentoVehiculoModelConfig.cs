using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class CargamentoVehiculoModelConfig
    {
        public static ModelBuilder ConfigurarCargamentoVehiculoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CargamentoVehiculo>(etb =>
            {
                etb.ToTable("CargamentoVehiculo", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DistribucionEnvioId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.VehiculoId)
                    .HasColumnType("int")
                    .IsRequired();

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
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.MedidaAlto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("int")
                    .IsRequired();

                etb.HasOne(e => e.Vehiculo)
                    .WithMany()
                    .HasForeignKey(e => e.VehiculoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Envio)
                    .WithMany()
                    .HasForeignKey(e => e.EnvioId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Producto)
                    .WithMany()
                    .HasForeignKey(e => e.ProductoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Unidad)
                    .WithMany()
                    .HasForeignKey(e => e.UnidadId)
                    .OnDelete(DeleteBehavior.Restrict);

                //TODO: ver como implementar el foreign key de una tabla versus
            });

            return modelBuilder;
        }
    }
}
