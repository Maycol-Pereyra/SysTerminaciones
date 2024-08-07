using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class PerfilPermisoModelConfig
    {
        public static ModelBuilder ConfigurarPerfilPermisoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PerfilPermiso>(etb =>
            {
                etb.ToTable("PerfilPermiso", "dbo");

                etb.HasKey(e => new { e.PerfilId, e.PermisoId});

                etb.Property(e => e.PerfilId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.PermisoId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
