using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class PermisoModelConfig
    {
        public static ModelBuilder ConfigurarPermisoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Permiso>(etb =>
            {
                etb.ToTable("Permiso", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Codigo)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.ProgramaId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
