using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DefectoModelConfig
    {
        public static ModelBuilder ConfigurarDefectoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Defecto>(etb =>
            {
                etb.ToTable("Defecto", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TipoDefectoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();


                etb.HasOne(e => e.TipoDefecto)
                    .WithMany()
                    .HasForeignKey(e => e.TipoDefectoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            return modelBuilder;
        }
    }
}
