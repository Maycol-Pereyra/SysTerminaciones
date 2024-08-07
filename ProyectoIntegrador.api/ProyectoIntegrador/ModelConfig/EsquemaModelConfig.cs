using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EsquemaModelConfig
    {
        public static ModelBuilder ConfigurarEsquemaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Esquema>(etb =>
            {
                etb.ToView("EsquemaView", "dbo");

                etb.HasNoKey();

                etb.Property(e => e.Tabla)
                    .HasColumnType("sysname")
                    .IsRequired();

                etb.Property(e => e.Posicion)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.Tipo)
                    .HasColumnType("nvarchar(256)")
                    .IsRequired(false);

                etb.Property(e => e.Campo)
                    .HasColumnType("sysname")
                    .IsRequired(false);

                etb.Property(e => e.ValorPredeterminado)
                    .HasColumnType("nvarchar(8000)")
                    .IsRequired(false);

                etb.Property(e => e.ValorNulo)
                    .HasColumnType("bit")
                    .IsRequired(false);

                etb.Property(e => e.LongitudMaximaCaracteres)
                    .HasColumnType("int")
                    .IsRequired(false);
            });

            return modelBuilder;
        }
    }
}
