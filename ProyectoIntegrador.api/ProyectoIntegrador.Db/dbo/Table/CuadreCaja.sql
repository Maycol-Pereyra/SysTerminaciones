CREATE TABLE CuadreCaja (
	[Id] INT PRIMARY KEY NOT NULL,
	[AperturaId] INT NOT NULL,
	[MontoEfectivo] DECIMAL(18, 2) NOT NULL,
	[MontoTarjeta] DECIMAL(18, 2) NOT NULL,
	[MontoOtro] DECIMAL(18, 2) NOT NULL,
	[MontoTotal] DECIMAL(18, 2) NOT NULL,
	[UsuarioCuadreId] INT NOT NULL,
	FOREIGN KEY (UsuarioCuadreId) REFERENCES Usuario(Id)
)
