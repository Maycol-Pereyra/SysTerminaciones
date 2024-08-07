using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class NominaModelConfig
    {
        public static ModelBuilder ConfigurarNominaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Nomina>(etb =>
            {
                etb.ToTable("Nomina", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TipoNomina)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaInicial)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaFinal)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.UsuarioCreacion)
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
