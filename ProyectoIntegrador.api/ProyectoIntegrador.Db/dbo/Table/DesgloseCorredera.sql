CREATE TABLE [dbo].[DesgloseCorredera] (
	[Id] INT PRIMARY KEY IDENTITY,
	[NumeroDesglose] VARCHAR(10) NOT NULL,
	[DespachoId] INT NULL,
	[Descripcion] VARCHAR(100) NOT NULL,
	[Nota] VARCHAR(250) NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaEntrega] DATETIME NULL,
	[EstadoId] INT NOT NULL,
	FOREIGN KEY (DespachoId) REFERENCES Despacho(Id)
)
