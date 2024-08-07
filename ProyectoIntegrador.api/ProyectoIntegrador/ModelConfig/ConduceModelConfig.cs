using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;
using System;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class ConduceModelConfig
    {
        public static ModelBuilder ConfigurarConduceModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Conduce>(etb =>
            {
                etb.ToTable("Conduce", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FacturaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.DireccionId)
                    .HasColumnType("int")
                    .IsRequired(false);

                etb.Property(e => e.Telefono)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.FechaModificacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.FechaRegistro)
                    .HasColumnType("datetime")
                    .IsRequired();
            });

            return modelBuilder;
        }
    }
}
