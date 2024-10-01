CREATE TABLE [dbo].[DespachoDetalle]
(
	[DespachoId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadId] INT NOT NULL,
	[MedidaAncho] DECIMAL(10, 6) NOT NULL,
	[MedidaAlto] DECIMAL(10, 6) NOT NULL,
	[Cantidad] INT NOT NULL,
	[CantidadDespachada] INT NOT NULL,
	[Nota] VARCHAR(250) NOT NULL,
	[EstadoId] INT NOT NULL,
	PRIMARY KEY (DespachoId, ProductoId, MedidaAncho, MedidaAlto),
	FOREIGN KEY (DespachoId) REFERENCES Despacho(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadId) REFERENCES Unidad(Id),
	FOREIGN KEY (EstadoId) REFERENCES Defecto(Id)
)
