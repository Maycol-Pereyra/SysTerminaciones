CREATE TABLE [dbo].[Despacho] (
	[Id] INT PRIMARY KEY IDENTITY,
	[FacturaId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaDespacho] DATETIME NULL,
	[FechaEntrega] DATETIME NULL,
	[FechaInstalacion] DATETIME NULL,
	[EstadoId] INT NOT NULL,
	FOREIGN KEY (FacturaId) REFERENCES Factura(Id),
	FOREIGN KEY (EstadoId) REFERENCES Registro(Id)
)
