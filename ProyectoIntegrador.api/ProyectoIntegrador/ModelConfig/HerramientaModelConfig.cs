using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class HerramientaModelConfig
    {
        public static ModelBuilder ConfigurarHerramientaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Herramienta>(etb =>
            {
                etb.ToTable("Herramienta", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
