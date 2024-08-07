﻿CREATE TABLE [dbo].[AperturaCaja] (
	[Id] INT PRIMARY KEY IDENTITY,
	[CajaId] INT NOT NULL,
	[UsuarioId] INT NOT NULL,
	[FechaApertura] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaCierre] DATETIME NULL,
	[TurnoId] INT NOT NULL,
	[CuadroCaja] BIT NOT NULL,
	FOREIGN KEY (CajaId) REFERENCES Caja(Id),
	FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id),
	FOREIGN KEY (TurnoId) REFERENCES Registro(Id)
)
