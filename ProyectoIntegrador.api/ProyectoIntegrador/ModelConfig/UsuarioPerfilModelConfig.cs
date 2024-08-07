using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class UsuarioPerfilModelConfig
    {
        public static ModelBuilder ConfigurarUsuarioPerfilModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsuarioPerfil>(etb =>
            {
                etb.ToTable("UsuarioPerfil", "dbo");

                etb.HasKey(e => new { e.UsuarioId, e.PerfilId});

                etb.Property(e => e.UsuarioId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.PerfilId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

            });

            return modelBuilder;
        }
    }
}
