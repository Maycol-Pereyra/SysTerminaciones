using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ErrorCuadreCajaModelConfig
    {
        public static ModelBuilder ConfigurarErrorCuadreCajaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ErrorCuadreCaja>(etb =>
            {
                etb.ToTable("ErrorCuadreCaja", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.AperturaCajaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UsuarioCuadreId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Monto)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
