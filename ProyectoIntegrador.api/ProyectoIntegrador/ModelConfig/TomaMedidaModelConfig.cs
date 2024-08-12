using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class TomaMedidaModelConfig
    {
        public static ModelBuilder ConfigurarTomaMedidaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TomaMedida>(etb =>
            {
                etb.ToTable("TomaMedida", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.UnidadProductoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Cantidad)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.MedidaAncho)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.MedidaAlto)
                    .HasColumnType("decimal(10, 6)")
                    .IsRequired();

                etb.Property(e => e.TipoMedidaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EsMedidaAproximada)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.Property(e => e.Nota)
                    .HasColumnType("varchar(250)")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
