CREATE TABLE [dbo].[EntidadTelefono] (
	[Descripcion] VARCHAR(50) NOT NULL,
	[Telefono] VARCHAR(10) NOT NULL,
	[EntidadId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	PRIMARY KEY (EntidadId, Telefono),
	FOREIGN KEY (EntidadId) REFERENCES Entidad(Id)
)
