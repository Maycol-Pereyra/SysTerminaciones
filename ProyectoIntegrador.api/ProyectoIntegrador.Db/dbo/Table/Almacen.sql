CREATE TABLE [dbo].[Almacen] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Nombre] VARCHAR(50) NOT NULL,
	[DireccionId] INT NOT NULL,
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (DireccionId) REFERENCES EntidadDireccion(Id)
)
