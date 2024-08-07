CREATE TABLE [dbo].[ProductUnidad] (
	[ProductoId] INT NOT NULL,
	[UnidadId] INT NOT NULL,
	[PrecioCompra] DECIMAL(18, 2) NOT NULL,
	[PrecioVenta] DECIMAL(18, 2) NOT NULL,
	[PrecioVentaInstalacion] DECIMAL(18, 2) NOT NULL,
	PRIMARY KEY (ProductoId, UnidadId),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadId) REFERENCES Unidad(Id)
)
