CREATE TABLE ErrorCuadreCaja (
	[Id] INT PRIMARY KEY IDENTITY,
	[AperturaCajaId] INT NOT NULL,
	[UsuarioCuadreId] INT NOT NULL,
	[Monto] DECIMAL(18, 2) NOT NULL,
	FOREIGN KEY (AperturaCajaId) REFERENCES CuadreCaja(Id)
)
