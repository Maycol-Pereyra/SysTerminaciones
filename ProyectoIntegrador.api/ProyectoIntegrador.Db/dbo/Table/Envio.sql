CREATE TABLE [dbo].[Envio]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[DespachoId] INT NOT NULL,
	[FechaEntrega] DATETIME NULL,
	[FechaEntregaCompromiso] DATETIME NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstadoId] INT NOT NULL,
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (DespachoId) REFERENCES Despacho(Id),
	FOREIGN KEY (EstadoId) REFERENCES Defecto(Id)
)
