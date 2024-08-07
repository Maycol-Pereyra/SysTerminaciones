﻿CREATE TABLE [dbo].[Unidad] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Descripcion] VARCHAR(50) NOT NULL UNIQUE,
	[Abreviatura] VARCHAR(5) NOT NULL UNIQUE,
	[Cantidad] INT NOT NULL,
	[FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL
)
