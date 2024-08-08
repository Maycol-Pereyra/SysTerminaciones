using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class AccesoModelConfig
    {
        public static ModelBuilder ConfigurarPermisoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Acceso>(etb =>
            {
                etb.ToTable("Acceso", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.Modulo)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Opcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Permiso)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(250)")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
