CREATE TABLE [dbo].[EntidadDireccion] (
	[Id] INT PRIMARY KEY IDENTITY,
	[EntidadId] INT NOT NULL,
	[Descripcion] VARCHAR(100) NOT NULL,
	[Calle] VARCHAR(50) NOT NULL,
	[Casa] VARCHAR(50) NOT NULL,
	[Referencia] VARCHAR(250) NOT NULL,
	[PaisId] INT NOT NULL,
	[ProvinciaId] INT NOT NULL,
	[CiudadId] INT NOT NULL,
	[SectorId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (EntidadId) REFERENCES Entidad(Id),
	FOREIGN KEY (PaisId) REFERENCES Pais(Id),
	FOREIGN KEY (CiudadId) REFERENCES Ciudad(Id),
	FOREIGN KEY (ProvinciaId) REFERENCES Provincia(Id),
	FOREIGN KEY (SectorId) REFERENCES Sector(Id)
)
