CREATE TABLE [dbo].[EntidadDireccion] (
	[Descripcion] VARCHAR(100) NOT NULL,
	[EntidadId] INT NOT NULL,
	[DireccionId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	PRIMARY KEY (EntidadId, DireccionId),
	FOREIGN KEY (EntidadId) REFERENCES Entidad(Id),
	FOREIGN KEY (DireccionId) REFERENCES Direccion(Id)
)
