CREATE TABLE [dbo].[CotizacionDetalle] (
	[CotizacionId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadProductoId] INT NOT NULL,
	[MedidaAncho] DECIMAL(18, 2) NOT NULL,
	[MedidaAlto] DECIMAL(18, 2) NOT NULL,
	[TipoMedidaId] INT NOT NULL,
	[Cantidad] DECIMAL(18, 2) NOT NULL,
	[PrecioUnitario] DECIMAL(18, 2) NOT NULL,
	[Impuesto] DECIMAL(18, 2) NOT NULL,
	[Descuento] DECIMAL(18, 2) NOT NULL,
	PRIMARY KEY (CotizacionId, ProductoId, MedidaAncho, MedidaAlto),
	FOREIGN KEY (CotizacionId) REFERENCES Cotizacion(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadProductoId) REFERENCES Unidad(Id)
)