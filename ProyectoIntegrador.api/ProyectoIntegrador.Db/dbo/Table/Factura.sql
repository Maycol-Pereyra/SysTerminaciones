CREATE TABLE [dbo].[Factura] (
	[Id] INT PRIMARY KEY IDENTITY,
	[TipoFacturaId] INT NOT NULL, -- D: despacho | C: credito
	[ClienteId] INT NOT NULL,
	[NumeroFactura] VARCHAR(15) NOT NULL,
	[MedioPagoId] INT NOT NULL, -- Transferencia | Efectivo | Tarjeta
	[Monto] DECIMAL(18, 2) NOT NULL,
	[BalancePendiente] DECIMAL(18, 2) NOT NULL,
	[Descuento] DECIMAL(18, 2) NOT NULL,
	[Impuesto] DECIMAL(18, 2) NOT NULL,
	[TipoComprobanteId] INT NOT NULL,
	[Comprobante] VARCHAR(8),
	[Nota] VARCHAR(100) NOT NULL,
	[LlevaEnvio] BIT NOT NULL,
	[LlevaInstalacion] BIT NOT NULL,
	[DireccionId] INT NULL,
	[UsuarioCreacionId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (TipoFacturaId) REFERENCES Registro(Id),
	FOREIGN KEY (ClienteId) REFERENCES Cliente(Id),
	FOREIGN KEY (MedioPagoId) REFERENCES Registro(Id),
	FOREIGN KEY (TipoComprobanteId) REFERENCES Registro(Id),
	FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuario(Id)
)
