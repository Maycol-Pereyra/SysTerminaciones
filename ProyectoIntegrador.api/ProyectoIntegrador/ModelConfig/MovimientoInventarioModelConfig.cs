using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class MovimientoInventarioModelConfig
    {
        public static ModelBuilder ConfigurarMovimientoInventarioModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovimientoInventario>(etb =>
            {
                etb.ToTable("MovimientoInventario", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TipoMovimientoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                etb.Property(e => e.AlmacenOrigenId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.AlmacenDestinoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Nota)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.UsuarioCreacionId)
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
