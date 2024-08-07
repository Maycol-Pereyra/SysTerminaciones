using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EntidadModelConfig
    {
        public static ModelBuilder ConfigurarEntidadModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Entidad>(etb =>
            {
                etb.ToTable("Entidad", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Nombre)
                    .HasColumnType("varchar(100)")
                    .IsRequired();


                etb.Property(e => e.Apellido)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.TipoIdentificacionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Identificacion)
                    .HasColumnType("varchar(30)")
                    .IsRequired();

                etb.Property(e => e.Correo)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetima")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.TipoIdentificacion)
                    .WithMany()
                    .HasForeignKey(e => e.TipoIdentificacionId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasMany(e => e.ListaEntidadDireccion)
                    .WithOne(x => x.Entidad)
                    .HasForeignKey(x => x.EntidadId)
                    .OnDelete(DeleteBehavior.Cascade);

                etb.HasMany(e => e.ListaEntidadTelefono)
                    .WithOne(x => x.Entidad)
                    .HasForeignKey(x => x.EntidadId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            return modelBuilder;
        }
    }
}
