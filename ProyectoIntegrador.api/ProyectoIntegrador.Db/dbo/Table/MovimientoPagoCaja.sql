CREATE TABLE MovimientoPagoCaja (
	[Id] INT PRIMARY KEY IDENTITY,
	[AperturaCajaId] INT NOT NULL,
	[FacturaId] INT NOT NULL,
	[Monto] DECIMAL(18, 2) NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (AperturaCajaId) REFERENCES AperturaCaja(Id),
	FOREIGN KEY (FacturaId) REFERENCES Factura(Id)
)