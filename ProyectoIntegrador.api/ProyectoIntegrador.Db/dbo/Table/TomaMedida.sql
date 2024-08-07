CREATE TABLE [dbo].[TomaMedida]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[ProductoId] INT NOT NULL,
	[UnidadProductoId] INT NOT NULL,
	[Cantidad] INT NOT NULL,
	[MedidaAncho] DECIMAL(10, 6) NOT NULL,
	[MedidaAlto] DECIMAL(10, 6) NOT NULL,
	[UnidadMedidaId] INT NOT NULL,
	[EsMedidaAproximada] BIT NOT NULL,
	[Nota] VARCHAR(250) NOT NULL,
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadMedidaId) REFERENCES Unidad(Id),
	FOREIGN KEY (UnidadProductoId) REFERENCES Unidad(Id)
)
