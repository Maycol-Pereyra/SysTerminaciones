CREATE TABLE [dbo].[EnsambladoDetalle]
(
	[EnsambladoId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadId] INT NOT NULL,
	[MedidaAncho] DECIMAL(10, 6) NOT NULL,
	[MedidaAlto] DECIMAL(10, 6) NOT NULL,
	[Cantidad] INT NOT NULL,
	[CantidadPendiente] INT NOT NULL,
	[EmpleadoAsignadoId] INT NOT NULL,
	[Nota] VARCHAR(250) NOT NULL,
	[EstadoId] INT NOT NULL,
	PRIMARY KEY (EnsambladoId, ProductoId, MedidaAncho, MedidaAlto),
	FOREIGN KEY (EnsambladoId) REFERENCES Ensamblado(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadId) REFERENCES Unidad(Id),
	FOREIGN KEY (EmpleadoAsignadoId) REFERENCES Empleado(Id),
	FOREIGN KEY (EstadoId) REFERENCES Defecto(Id)
)
