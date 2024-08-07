using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DesgloseEfectivoAsignadoCajaModelConfig
    {
        public static ModelBuilder ConfigurarDesgloseEfectivoAsignadoCajaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DesgloseEfectivoAsignadoCaja>(etb =>
            {
                etb.ToTable("DesgloseEfectivoAsignadoCaja", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.AperturaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ValorMoneda)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
