
CREATE TABLE [dbo].[Herramienta] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Descripcion] VARCHAR(100) NOT NULL,
	[EstadoId] INT NOT NULL,
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (EstadoId) REFERENCES TipoRegistro(Id)
)
