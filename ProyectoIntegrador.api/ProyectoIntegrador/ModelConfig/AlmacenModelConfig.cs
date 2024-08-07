using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class AlmacenModelConfig
    {
        public static ModelBuilder ConfigurarAlmacenModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Almacen>(etb =>
            {
                etb.ToTable("Almacen", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Nombre)
                    .HasColumnType("varchar(100)")
                    .IsRequired();


                etb.Property(e => e.Nombre)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.DireccionId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.Direccion)
                    .WithMany()
                    .HasForeignKey(e => e.DireccionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
