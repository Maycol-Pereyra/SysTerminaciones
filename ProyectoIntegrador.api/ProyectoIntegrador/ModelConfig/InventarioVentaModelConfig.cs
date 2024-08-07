using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class InventarioVentaModelConfig
    {
        public static ModelBuilder ConfigurarInventarioVentaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventarioVenta>(etb =>
            {
                etb.ToTable("InventarioVenta", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.InventarioId)
                    .HasColumnType("int")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
