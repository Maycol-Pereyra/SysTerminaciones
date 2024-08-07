CREATE TABLE [dbo].[DistribucionEnvioVehiculo]
(
	[DistribucionEnvioId] INT NOT NULL,
	[VehiculoId] INT NOT NULL,
	[ConductorId] INT NOT NULL,
	PRIMARY KEY (DistribucionEnvioId, VehiculoId),
	FOREIGN KEY (DistribucionEnvioId) REFERENCES DistribucionEnvio(Id),
	FOREIGN KEY (VehiculoId) REFERENCES Vehiculo(Id),
	FOREIGN KEY (ConductorId) REFERENCES Empleado(Id)
)