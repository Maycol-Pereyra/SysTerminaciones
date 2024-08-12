CREATE TABLE [dbo].[Cliente] (
	[Id] INT PRIMARY KEY IDENTITY,
	[EntidadId] INT NOT NULL,
	[TiempoCredito] INT NOT NULL,
	[LimiteCredito] DECIMAL(18, 2) NOT NULL,
	[Correo] VARCHAR(100) NOT NULL,
	[FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (EntidadId) REFERENCES Entidad(Id)
)
