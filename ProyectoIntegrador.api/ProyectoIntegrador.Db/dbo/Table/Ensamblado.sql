CREATE TABLE [dbo].[Ensamblado] (
	[Id] INT PRIMARY KEY IDENTITY,
	[DespachoId] INT NOT NULL,
	[DesgloseCorrederaId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaEntrega] DATETIME NULL,
	[Nota] VARCHAR(250) NOT NULL,
	[EstadoId] INT NOT NULL,
	FOREIGN KEY (DespachoId) REFERENCES Despacho(Id),
	FOREIGN KEY (DesgloseCorrederaId) REFERENCES DesgloseCorredera(Id),
	FOREIGN KEY (EstadoId) REFERENCES Defecto(Id),
)

