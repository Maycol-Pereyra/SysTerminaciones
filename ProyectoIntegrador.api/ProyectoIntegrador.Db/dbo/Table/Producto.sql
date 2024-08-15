CREATE TABLE [dbo].[Producto] (
	[Id] INT PRIMARY KEY IDENTITY,
	[Descripcion] VARCHAR(100) NOT NULL,
	[DescripcionCliente] VARCHAR(100) NOT NULL,
    [CategoriaId] INT NOT NULL,
    [SuplidorId] INT NOT NULL,
    [TipoProductoId] INT NOT NULL,
    [ColorId] INT NULL,
    [MedidaAncho] DECIMAL (10, 6) NOT NULL,
    [MedidaAlto] DECIMAL (10, 6) NOT NULL,
    [TipoMedidaId] INT NOT NULL DEFAULT 1,
    [FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
    [FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
    [EstaActivo] BIT NOT NULL,
    FOREIGN KEY (CategoriaId) REFERENCES Registro(Id),
    FOREIGN KEY (SuplidorId) REFERENCES Suplidor(Id),
    FOREIGN KEY (TipoProductoId) REFERENCES TipoProducto(Id),
    FOREIGN KEY (ColorId) REFERENCES Registro(Id)
    --TODO: Ver Tema de los impuestos
)
