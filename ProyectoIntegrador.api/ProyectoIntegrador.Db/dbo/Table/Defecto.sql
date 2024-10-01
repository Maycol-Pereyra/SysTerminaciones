CREATE TABLE [dbo].[Defecto]
(
	[Id] INT PRIMARY KEY,
	[TipoDefectoId] INT NOT NULL,
	[Descripcion] VARCHAR(100) NOT NULL,
	FOREIGN KEY (TipoDefectoId) REFERENCES TipoDefecto(Id)
)
