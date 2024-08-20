CREATE TABLE [dbo].[ProductoDetalleProduccion]
(
	[ProductoId] INT NOT NULL,
	[ProductoProduccionId] INT NOT NULL,
	[UnidadProduccionId] INT NOT NULL DEFAULT 1,
	[Cantidad] DECIMAL(18, 2) NOT NULL,
	[Descuento] DECIMAL(10, 6) NOT NULL DEFAULT 0,
	[Division] INT NOT NULL DEFAULT 0,
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (ProductoProduccionId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadProduccionId) REFERENCES Unidad(Id),
	PRIMARY KEY(ProductoId, ProductoProduccionId)
)
