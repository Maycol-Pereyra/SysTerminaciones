using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DireccionModelConfig
    {
        public static ModelBuilder ConfigurarDireccionModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Direccion>(etb =>
            {
                etb.ToTable("Direccion", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Calle)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.Casa)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.Referencia)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.PaisId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProvinciaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CiudadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.SectorId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
