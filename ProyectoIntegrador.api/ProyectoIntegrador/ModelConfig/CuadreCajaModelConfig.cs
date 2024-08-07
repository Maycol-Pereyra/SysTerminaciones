using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class CuadreCajaModelConfig
    {
        public static ModelBuilder ConfigurarCuadreCajaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CuadreCaja>(etb =>
            {
                etb.ToTable("CuadreCaja", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.AperturaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MontoEfectivo)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.MontoTarjeta)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.MontoOtro)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.MontoTotal)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.UsuarioCuadreId)
                    .HasColumnType("int");
            });

            return modelBuilder;
        }
    }
}
