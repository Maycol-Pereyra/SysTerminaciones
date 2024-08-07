CREATE TABLE [dbo].[Inventario] (
	[Id] INT PRIMARY KEY IDENTITY,
	[AlmacenId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadId] INT NOT NULL,
	[EstadoId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (AlmacenId) REFERENCES Almacen(Id),
	FOREIGN KEY (UnidadId) REFERENCES Unidad(Id),
	FOREIGN KEY (EstadoId) REFERENCES Registro(Id)
)