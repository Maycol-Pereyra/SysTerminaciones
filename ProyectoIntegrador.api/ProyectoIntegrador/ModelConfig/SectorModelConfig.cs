using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class SectorModelConfig
    {
        public static ModelBuilder ConfigurarSectorModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Sector>(etb =>
            {
                etb.ToTable("Sector", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.CiudadId)
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
