CREATE TABLE [dbo].[MovimientoInventario] (
	[Id] INT PRIMARY KEY IDENTITY,
	[TipoMovimientoId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[Cantidad] DECIMAL(18, 2) NOT NULL,
	[AlmacenOrigenId] INT NOT NULL,
	[AlmacenDestinoId] INT NOT NULL,
	[Nota] VARCHAR(250) NOT NULL,
	[UsuarioCreacionId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id),
	FOREIGN KEY (TipoMovimientoId) REFERENCES Registro(Id),
	FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuario(Id),
	FOREIGN KEY (AlmacenOrigenId) REFERENCES Almacen(Id),
	FOREIGN KEY (AlmacenDestinoId) REFERENCES Almacen(Id)
)
