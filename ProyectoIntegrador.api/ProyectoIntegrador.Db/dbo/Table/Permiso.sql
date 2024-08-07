CREATE TABLE [dbo].[Permiso]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[Descripcion] VARCHAR(100) NOT NULL,
	[Codigo] VARCHAR(100) NOT NULL,
	[ProgramaId] INT NOT NULL,
	FOREIGN KEY (ProgramaId) REFERENCES Programa(Id)
)
