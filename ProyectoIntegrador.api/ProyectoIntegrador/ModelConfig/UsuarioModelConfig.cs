using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class UsuarioModelConfig
    {
        public static ModelBuilder ConfigurarUsuarioModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(etb =>
            {
                etb.ToTable("Usuario", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EntidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EmpleadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Login)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.PasswordHash)
                    .HasColumnType("varbinary(64)")
                    .IsRequired();

                etb.Property(e => e.PasswordSalt)
                    .HasColumnType("varbinary(128)")
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

                etb.HasOne(e => e.Empleado)
                    .WithMany()
                    .HasForeignKey(e => e.EmpleadoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Entidad)
                    .WithMany()
                    .HasForeignKey(e => e.EntidadId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasMany(e => e.ListaUsuarioPerfil)
                    .WithOne(x => x.Usuario)
                    .HasForeignKey(e => e.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);

            });

            return modelBuilder;
        }
    }
}
