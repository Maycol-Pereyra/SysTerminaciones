CREATE TABLE [dbo].[DesgloseCorrederaEmpleado] (
	[DesgloseCorrederaDetalleOrigenId] INT NOT NULL,
	[EmpleadoAsignadoId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadId] INT NOT NULL,
	[MedidaAncho] DECIMAL(18, 2) NOT NULL,
	[MedidaAlto] DECIMAL(18, 2) NOT NULL,
	[CantidadPieza] INT NOT NULL,
	[CantidadPiezaPendiente] INT NOT NULL,
	[EstadoId] INT NOT NULL,
	[Nota] VARCHAR(250) NOT NULL,
	PRIMARY KEY (DesgloseCorrederaDetalleOrigenId, EmpleadoAsignadoId, ProductoId),
	FOREIGN KEY (DesgloseCorrederaDetalleOrigenId) REFERENCES DesgloseCorredera(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (EmpleadoAsignadoId) REFERENCES Empleado(Id),
	FOREIGN KEY (EstadoId) REFERENCES Defecto(Id),
	FOREIGN KEY (UnidadId) REFERENCES Unidad(Id)
)

--TODO MAYCOL: A evaluar esta tabla
