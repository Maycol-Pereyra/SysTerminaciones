using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class TipoRegistroModelConfig
    {
        public static ModelBuilder ConfigurarTipoRegistroModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoRegistro>(etb =>
            {
                etb.ToTable("TipoRegistro", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
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
