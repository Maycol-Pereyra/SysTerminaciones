using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class TipoProductoModelConfig
    {
        public static ModelBuilder ConfigurarTipoProductoModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TipoProducto>(etb =>
            {
                etb.ToTable("TipoProducto", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.UsaMedidaAncho)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.UsaMedidaAlto)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.UsaDescuento)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.UsaDivision)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.UsaInstalacion)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.DescuentoCabezal)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.DescuentoVidrioAncho)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.DescuentoRiel)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.DescuentoLlavinEnganche)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.DescuentoVidrioAlto)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.DescuentoLateral)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.CantidadCabezal)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadRiel)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadLlavin)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadEnganche)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadLateral)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CantidadVidrio)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
