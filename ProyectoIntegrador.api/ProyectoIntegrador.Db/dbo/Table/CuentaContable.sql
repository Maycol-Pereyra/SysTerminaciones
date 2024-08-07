CREATE TABLE [dbo].[CuentaContable] (
	[Id] INT PRIMARY KEY,
	[Descripcion] VARCHAR(100) NOT NULL UNIQUE,
	[Origen] BIT NOT NULL, -- (D) o (C)
	[CuentaContableAcumularId] INT NOT NULL,
	[ClasificacionContableId] INT NOT NULL,
	[CuentaControl] BIT NOT NULL, -- Ejemplo: ACTIVOS, INGRESOS, ENTRE OTROS...
	[UsuarioCreacionId] INT NOT NULL,
	[FechaModificacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (CuentaContableAcumularId) REFERENCES CuentaContable(Id),
	FOREIGN KEY (ClasificacionContableId) REFERENCES ClasificacionContable(Id),
	FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuario(Id)
)
