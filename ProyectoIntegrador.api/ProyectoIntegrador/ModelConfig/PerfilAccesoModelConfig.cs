using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class PerfilAccesoModelConfig
    {
        public static ModelBuilder ConfigurarPerfilPermisoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PerfilAcceso>(etb =>
            {
                etb.ToTable("PerfilAcceso", "dbo");

                etb.HasKey(e => new { e.PerfilId, e.AccesoId});

                etb.Property(e => e.PerfilId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.AccesoId)
                    .HasColumnType("varchar(250)")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
