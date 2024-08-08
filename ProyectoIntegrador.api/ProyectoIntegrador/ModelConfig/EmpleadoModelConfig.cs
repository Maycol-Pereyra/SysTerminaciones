using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EmpleadoModelConfig
    {
        public static ModelBuilder ConfigurarEmpleadoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empleado>(etb =>
            {
                etb.ToTable("Empleado", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EntidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Sueldo)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.PosicionId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.DepartamentoId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.FechaIngreso)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaTerminoContrato)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.Entidad)
                    .WithMany()
                    .HasForeignKey(e => e.EntidadId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Posicion)
                    .WithMany()
                    .HasForeignKey(e => e.PosicionId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Departamento)
                    .WithMany()
                    .HasForeignKey(e => e.DepartamentoId)
                    .OnDelete(DeleteBehavior.Restrict);

            });

            return modelBuilder;
        }
    }
}
