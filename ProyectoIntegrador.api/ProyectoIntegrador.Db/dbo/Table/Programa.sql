CREATE TABLE [dbo].[Programa] (
	[Id] INT PRIMARY KEY,
	[ModuloId] INT NOT NULL,
	[TipoProgramaId] INT NOT NULL,
	[Descripcion] VARCHAR(100) NOT NULL,
	[Ruta] VARCHAR(100) UNIQUE NOT NULL,
	[Icono] VARCHAR(100) NOT NULL,
	[Orden] TINYINT NOT NULL,
	FOREIGN KEY (ModuloId) REFERENCES Registro(Id),
	FOREIGN KEY (TipoProgramaId) REFERENCES Registro(Id)
)
