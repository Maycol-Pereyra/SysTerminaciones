
CREATE TABLE [dbo].[Herramienta] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Descripcion] VARCHAR(100) NOT NULL,
	[EstadoId] INT NOT NULL,
	FOREIGN KEY (EstadoId) REFERENCES TipoRegistro(Id)
)
