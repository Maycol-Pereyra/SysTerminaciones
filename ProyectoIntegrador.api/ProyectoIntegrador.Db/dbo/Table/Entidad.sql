CREATE TABLE [dbo].[Entidad] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Nombre] VARCHAR(100) NOT NULL,
	[Apellido] VARCHAR(100) NOT NULL,
	[TipoIdentificacionId] INT NOT NULL DEFAULT 1,
	[Identificacion] VARCHAR(30) UNIQUE NOT NULL DEFAULT '',
	[Correo] VARCHAR(100) NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (TipoIdentificacionId) REFERENCES Registro(Id)
)
