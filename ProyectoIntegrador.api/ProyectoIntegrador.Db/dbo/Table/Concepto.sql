CREATE TABLE [dbo].[Concepto] (
	[Id] INT PRIMARY KEY,
	[Descripcion] VARCHAR(100) NOT NULL,
	[Accion] BIT NOT NULL, -- (+) o (-)
	[CuentaContableId] INT NOT NULL,
	[UsuarioCreacionId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (CuentaContableId) REFERENCES CuentaContable(Id),
	FOREIGN KEY (UsuarioCreacionId) REFERENCES Usuario(Id)
)
