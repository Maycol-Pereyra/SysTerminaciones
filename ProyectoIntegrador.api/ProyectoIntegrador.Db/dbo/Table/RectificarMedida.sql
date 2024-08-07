CREATE TABLE [dbo].[RectificarMedida]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[SolicitudTomaMedidaId] INT NOT NULL,
	[EmpleadoAsignadoId] INT NULL,
	[VehiculoAsignadoId] INT NULL,
	[FechaCompromisoRectificarMedida] DATETIME NULL,
	[FechaRectificarMedida] DATETIME NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (EmpleadoAsignadoId) REFERENCES Empleado(Id),
	FOREIGN KEY (VehiculoAsignadoId) REFERENCES Vehiculo(Id)
)
