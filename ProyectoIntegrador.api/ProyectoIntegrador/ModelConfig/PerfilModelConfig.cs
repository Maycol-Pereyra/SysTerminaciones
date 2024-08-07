using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class PerfilModelConfig
    {
        public static ModelBuilder ConfigurarPerfilModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Perfil>(etb =>
            {
                etb.ToTable("Perfil", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasMany(e => e.ListaDetalle)
                    .WithOne(x => x.Perfil)
                    .HasForeignKey(e => e.PerfilId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            return modelBuilder;
        }
    }
}
