using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ProgramaModelConfig
    {
        public static ModelBuilder ConfigurarProgramaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Programa>(etb =>
            {
                etb.ToTable("Programa", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ModuloId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TipoProgramaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Ruta)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Icono)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Orden)
                    .HasColumnType("tinybit")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
