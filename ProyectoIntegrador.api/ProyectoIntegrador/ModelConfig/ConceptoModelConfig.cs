using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ConceptoModelConfig
    {
        public static ModelBuilder ConfigurarConceptoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Concepto>(etb =>
            {
                etb.ToTable("Concepto", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Accion)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.CuentaContableId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UsuarioCreacionId)
                    .HasColumnType("int")
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
