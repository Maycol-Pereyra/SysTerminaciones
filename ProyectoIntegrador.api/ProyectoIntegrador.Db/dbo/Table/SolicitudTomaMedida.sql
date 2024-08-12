CREATE TABLE [dbo].[SolicitudTomaMedida] (
	[Id] INT PRIMARY KEY IDENTITY,
	[ClienteId] INT NOT NULL,
	[DireccionId] INT NOT NULL,
	[EmpleadoAsignadoId] INT NULL,
	[VehiculoAsignadoId] INT NULL,
	[FechaCompromisoTomaMedida] DATETIME NULL,
	[FechaTomaMedida] DATETIME NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstadoId] INT NOT NULL,
	FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
	FOREIGN KEY (DireccionId) REFERENCES EntidadDireccion(Id),
	FOREIGN KEY (EmpleadoAsignadoId) REFERENCES Empleado(Id),
	FOREIGN KEY (VehiculoAsignadoId) REFERENCES Vehiculo(Id),
	FOREIGN KEY (EstadoId) REFERENCES Registro(Id)
)
