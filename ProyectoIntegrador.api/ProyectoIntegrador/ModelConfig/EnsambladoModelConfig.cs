using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EnsambladoModelConfig
    {
        public static ModelBuilder ConfigurarEnsambladoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ensamblado>(etb =>
            {
                etb.ToTable("Ensamblado", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DespachoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DesgloseCorrederaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaEntrega)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.Nota)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
