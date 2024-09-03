CREATE TABLE [dbo].[Registro] (
	[Id] INT PRIMARY KEY IDENTITY,
	[TipoRegistroId] INT NOT NULL,
	[Descripcion] VARCHAR(100) NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (TipoRegistroId) REFERENCES TipoRegistro(Id)
)
