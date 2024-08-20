CREATE TABLE [dbo].[ProductoDetalleProduccion]
(
	[ProductoId] INT NOT NULL,
	[ProductoProduccionId] INT NOT NULL,
	[UnidadProduccionId] INT NOT NULL DEFAULT 1,
	[Cantidad] DECIMAL(18, 2) NOT NULL,
	--[MedidaAncho] DECIMAL(10, 6) NOT NULL,
	--[MedidaAlto] DECIMAL(10, 6) NOT NULL,
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (ProductoProduccionId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadProduccionId) REFERENCES Unidad(Id),
	PRIMARY KEY(ProductoId, ProductoProduccionId)
)
