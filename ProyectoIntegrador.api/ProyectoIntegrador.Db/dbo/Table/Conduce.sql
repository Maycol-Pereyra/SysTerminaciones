﻿CREATE TABLE [dbo].[Conduce] (
	[Id] INT PRIMARY KEY IDENTITY,
	[FacturaId] INT NOT NULL,
	[DireccionId] INT NULL,
	[Telefono] VARCHAR(250),
	[FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaRegistro] DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (FacturaId) REFERENCES Factura(Id)
)
