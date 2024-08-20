using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ProductoModelConfig
    {
        public static ModelBuilder ConfigurarProductoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Producto>(etb =>
            {
                etb.ToTable("Producto", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.DescripcionCliente)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.CategoriaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.SuplidorId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.TipoProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ColorId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.MedidaAncho)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.MedidaAlto)
                    .HasColumnType("decimal(10, 6)")
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

                etb.HasOne(e => e.Categoria)
                    .WithMany()
                    .HasForeignKey(e => e.CategoriaId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.TipoProducto)
                    .WithMany()
                    .HasForeignKey(e => e.TipoProductoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Color)
                    .WithMany()
                    .HasForeignKey(e => e.ColorId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Suplidor)
                    .WithMany()
                    .HasForeignKey(e => e.SuplidorId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasMany(e => e.ListaProductoUnidad)
                    .WithOne(x => x.Producto)
                    .HasForeignKey(x => x.ProductoId)
                    .OnDelete(DeleteBehavior.Cascade);

                etb.HasMany(e => e.ListaProductoDetalleProduccion)
                    .WithOne(x => x.Producto)
                    .HasForeignKey(x => x.ProductoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            return modelBuilder;
        }
    }
}
