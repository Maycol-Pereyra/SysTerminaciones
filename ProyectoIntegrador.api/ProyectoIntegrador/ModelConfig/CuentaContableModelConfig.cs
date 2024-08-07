using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class CuentaContableModelConfig
    {
        public static ModelBuilder ConfigurarCuentaContableModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CuentaContable>(etb =>
            {
                etb.ToTable("CuentaContable", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Origen)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.CuentaContableAcumularId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ClasificacionContableId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CuentaControl)
                    .HasColumnType("bit")
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
