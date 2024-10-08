﻿using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;

namespace ProyectoIntegrador.DataModelConfig
{
    public static class EntidadDireccionModelConfig
    {
        public static ModelBuilder ConfigurarEntidadDireccionModelConfig(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EntidadDireccion>(etb =>
            {
                etb.ToTable("EntidadDireccion", "dbo");

                etb.HasKey(e => e.Id);

                etb.Property(e => e.Id)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.EntidadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.Descripcion)
                    .HasColumnType("varchar(100)")
                    .IsRequired();

                etb.Property(e => e.Calle)
                    .HasColumnType("varchar(50)")
                    .IsRequired();

                etb.Property(e => e.Casa)
                    .HasColumnType("varchar(50)")
                    .IsRequired();


                etb.Property(e => e.Referencia)
                    .HasColumnType("varchar(250)")
                    .IsRequired();

                etb.Property(e => e.PaisId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.ProvinciaId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.CiudadId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.SectorId)
                    .HasColumnType("int")
                    .IsRequired();

                etb.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .IsRequired();

                etb.Property(e => e.EstaActivo)
                    .HasColumnType("bit")
                    .IsRequired();

                etb.HasOne(e => e.Pais)
                    .WithMany()
                    .HasForeignKey(e => e.PaisId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Provincia)
                    .WithMany()
                    .HasForeignKey(e => e.ProvinciaId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Ciudad)
                    .WithMany()
                    .HasForeignKey(e => e.CiudadId)
                    .OnDelete(DeleteBehavior.Restrict);

                etb.HasOne(e => e.Sector)
                    .WithMany()
                    .HasForeignKey(e => e.SectorId)
                    .OnDelete(DeleteBehavior.Restrict);

            });

            return modelBuilder;
        }
    }
}
