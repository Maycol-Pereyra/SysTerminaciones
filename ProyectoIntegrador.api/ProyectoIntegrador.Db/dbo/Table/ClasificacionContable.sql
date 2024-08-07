CREATE TABLE [dbo].[ClasificacionContable] (
	[Id] INT PRIMARY KEY,
	[Descripcion] VARCHAR(100) NOT NULL UNIQUE,
	[UsuarioCreacionId] INT NOT NULL,
	[FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL
)
