CREATE TABLE [dbo].[Empleado] (
	[Id] INT PRIMARY KEY IDENTITY,
	[EntidadId] INT NOT NULL,
	[Sueldo] DECIMAL(18, 2) NOT NULL,
	[PosicionId] INT NULL,
	[DepartamentoId] INT NULL,
	[FechaIngreso] DATETIME NOT NULL DEFAULT GETDATE(),
	[FechaTerminoContrato] DATETIME NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (EntidadId) REFERENCES Entidad(Id),
	FOREIGN KEY (PosicionId) REFERENCES Registro(Id),
	FOREIGN KEY (DepartamentoId) REFERENCES Registro(Id)
)
