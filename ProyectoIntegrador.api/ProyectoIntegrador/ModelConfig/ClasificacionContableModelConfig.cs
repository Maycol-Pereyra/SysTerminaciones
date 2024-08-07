using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ClasificacionContableModelConfig
    {
        public static ModelBuilder ConfigurarClasificacionContableModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClasificacionContable>(etb =>
            {
                etb.ToTable("ClasificacionContable", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();


                etb.Property(e => e.UsuarioCreacionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaModificacion)
                    .HasColumnType("datetime")
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
