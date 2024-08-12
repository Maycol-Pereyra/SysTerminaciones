CREATE TABLE [dbo].[CompraDetalle] (
	[CompraId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadProductoId] INT NOT NULL,
	[MedidaAncho] DECIMAL(18, 2) NOT NULL,
	[MedidaAlto] DECIMAL(18, 2) NOT NULL,
	[TipoMedidaId] INT NOT NULL,
	[Cantidad] DECIMAL(18, 2) NOT NULL,
	[CantidadRecibida] DECIMAL(18, 2) NOT NULL,
	[PrecioUntario] DECIMAL(18, 2) NOT NULL,
	[Impuesto] DECIMAL(18, 2) NOT NULL,
	[Descuento] DECIMAL(18, 2) NOT NULL,
	PRIMARY KEY (CompraId, ProductoId, MedidaAncho, MedidaAlto),
	FOREIGN KEY (CompraId) REFERENCES Compra(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadProductoId) REFERENCES Unidad(Id)
)