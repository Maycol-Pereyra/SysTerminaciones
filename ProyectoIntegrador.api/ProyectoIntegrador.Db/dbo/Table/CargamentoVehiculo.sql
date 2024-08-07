CREATE TABLE [dbo].[CargamentoVehiculo]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[DistribucionEnvioId] INT NOT NULL,
	[VehiculoId] INT NOT NULL,
	[EnvioId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[UnidadId] INT NOT NULL,
	[MedidaAncho] DECIMAL(18, 2) NOT NULL,
	[MedidaAlto] DECIMAL(18, 2) NOT NULL,
	[Cantidad] INT NOT NULL,
	FOREIGN KEY (DistribucionEnvioId, VehiculoId) REFERENCES DistribucionEnvioVehiculo(DistribucionEnvioId, VehiculoId),
	FOREIGN KEY (VehiculoId) REFERENCES Vehiculo(Id),
	FOREIGN KEY (EnvioId) REFERENCES Envio(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (UnidadId) REFERENCES Unidad(Id)
)
