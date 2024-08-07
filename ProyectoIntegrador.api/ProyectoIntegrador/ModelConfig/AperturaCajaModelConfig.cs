using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class AperturaCajaModelConfig
    {
        public static ModelBuilder ConfigurarAperturaCajaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AperturaCaja>(etb =>
            {
                etb.ToTable("AperturaCaja", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CajaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UsuarioId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaApertura)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaCierre)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.TurnoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CuadroCaja)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.Caja)
                    .WithMany()
                    .HasForeignKey(e => e.CajaId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Usuario)
                    .WithMany()
                    .HasForeignKey(e => e.UsuarioId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Registro)
                    .WithMany()
                    .HasForeignKey(e => e.TurnoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
