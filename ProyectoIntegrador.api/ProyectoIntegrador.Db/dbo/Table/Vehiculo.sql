CREATE TABLE [dbo].[Vehiculo] (
	[Id] INT PRIMARY KEY IDENTITY,
    [Marca] VARCHAR(50) NOT NULL,
    [Modelo] VARCHAR(50) NOT NULL,
    [AnoFabricacion] INT NOT NULL,
    [Placa] VARCHAR(20) UNIQUE NOT NULL,
    [ColorId] INT NOT NULL,
    [Kilometraje] INT NOT NULL,
    [CapacidadCarga] DECIMAL(18,2) NOT NULL,
    [UnidadCargaId] INT NOT NULL,
    --[FechaUltimoMantenimiento] DATETIME NULL,                         TODO MAYCOL: Agregar a la tabla del mantenimiento (que no existe)
    --[FechaProximoMantenimiento] DATETIME NOT NULL DEFAULT GETDATE(),
    [EstadoId] INT NOT NULL,
    [FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
    [FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
    [EstaActivo] BIT NOT NULL,
    FOREIGN KEY (ColorId) REFERENCES Registro(Id),
    FOREIGN KEY (UnidadCargaId) REFERENCES Unidad(Id),
    FOREIGN KEY (EstadoId) REFERENCES Defecto(Id)
)
