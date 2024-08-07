CREATE TABLE [dbo].[FacturaDetalle] (
	[FacturaId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadProductoId] INT NOT NULL,
	[MedidaAncho] DECIMAL(10, 6) NOT NULL,
	[MedidaAlto] DECIMAL(10, 6) NOT NULL,
	[UnidadMedidaId] INT NOT NULL,
	[Cantidad] DECIMAL(10, 6) NOT NULL,
	[CantidadEntregada] DECIMAL(10, 6) NOT NULL,
	[PrecioUnitario] DECIMAL(18, 2) NOT NULL,
	[Impuesto] DECIMAL(18, 2) NOT NULL,
	[Descuento] DECIMAL(18, 2) NOT NULL,
	PRIMARY KEY (FacturaId, ProductoId),
	FOREIGN KEY (FacturaId) REFERENCES Factura(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadProductoId) REFERENCES Unidad(Id),
	FOREIGN KEY (UnidadMedidaId) REFERENCES Unidad(Id)
)