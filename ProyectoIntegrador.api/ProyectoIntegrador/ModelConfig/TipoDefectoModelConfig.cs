using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class TipoDefectoModelConfig
    {
        public static ModelBuilder ConfigurarTipoDefectoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoDefecto>(etb =>
            {
                etb.ToTable("TipoDefecto", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
