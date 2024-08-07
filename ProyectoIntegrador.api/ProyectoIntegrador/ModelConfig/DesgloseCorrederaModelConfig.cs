using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;
using System;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class DesgloseCorrederaModelConfig
    {
        public static ModelBuilder ConfigurarDesgloseCorrederaModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DesgloseCorredera>(etb =>
            {
                etb.ToTable("DesgloseCorredera", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DespachoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Nota)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaEntrega)
                    .HasColumnType("datetime")
                    .IsRequired(false);

                etb.Property(e => e.EstadoId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.HasOne(e => e.Despacho)
                    .WithMany()
                    .HasForeignKey(e => e.DespachoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Estado)
                    .WithMany()
                    .HasForeignKey(e => e.EstadoId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasMany(e => e.ListaDetalle)
                    .WithOne(x => x.DesgloseCorredera)
                    .HasForeignKey(e => e.DesgloseCorrederaId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            return modelBuilder;
        }
    }
}
