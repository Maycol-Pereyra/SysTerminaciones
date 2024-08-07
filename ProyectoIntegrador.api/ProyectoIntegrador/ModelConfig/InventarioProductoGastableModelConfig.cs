using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class InventarioProductoGastableModelConfig
    {
        public static ModelBuilder ConfigurarInventarioProductoGastableModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InventarioProductoGastable>(etb =>
            {
                etb.ToTable("InventarioProductoGastable", "dbo");

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
