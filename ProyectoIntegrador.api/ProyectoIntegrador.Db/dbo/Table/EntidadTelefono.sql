CREATE TABLE [dbo].[EntidadTelefono] (
	[Id] INT PRIMARY KEY IDENTITY,
	[EntidadId] INT NOT NULL,
	[Descripcion] VARCHAR(50) NOT NULL,
	[Telefono] VARCHAR(13) NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (EntidadId) REFERENCES Entidad(Id)
)
