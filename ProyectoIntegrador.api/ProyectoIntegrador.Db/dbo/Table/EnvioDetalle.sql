CREATE TABLE [dbo].[EnvioDetalle]
(
	[EnvioId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadId] INT NOT NULL,
	[MedidaAncho] DECIMAL(10, 6) NOT NULL,
	[MedidaAlto] DECIMAL(10, 6) NOT NULL,
	[Cantidad] INT NOT NULL,
	[CantidadEntregada] INT NOT NULL,
	[EstadoId] INT NOT NULL,
	PRIMARY KEY (EnvioId, ProductoId, MedidaAncho, MedidaAlto),
	FOREIGN KEY (EnvioId) REFERENCES Envio(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadId) REFERENCES Unidad(Id),
	FOREIGN KEY (EstadoId) REFERENCES Defecto(Id)
)
