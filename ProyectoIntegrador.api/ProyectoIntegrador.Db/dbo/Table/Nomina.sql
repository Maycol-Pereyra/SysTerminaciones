CREATE TABLE [dbo].[Nomina] (
	[Id] INT PRIMARY KEY IDENTITY,
	[TipoNomina] INT NOT NULL,
	[FechaInicial] DATETIME NOT NULL,
	[FechaFinal] DATETIME NOT NULL,
	[UsuarioCreacion] INT NOT NULL,
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (TipoNomina) REFERENCES Registro(Id),
	FOREIGN KEY (UsuarioCreacion) REFERENCES Usuario(Id)
)
