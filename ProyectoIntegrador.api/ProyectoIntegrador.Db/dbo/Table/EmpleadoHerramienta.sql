CREATE TABLE [dbo].[EmpleadoHerramienta] (
	[EmpleadoId] INT NOT NULL,
	[HerramientaId] INT NOT NULL,
	[FechaAsignacion] DATETIME NOT NULL DEFAULT GETDATE(),
	PRIMARY KEY (EmpleadoId, HerramientaId),
	FOREIGN KEY (EmpleadoId) REFERENCES Empleado(Id),
	FOREIGN KEY (HerramientaId) REFERENCES TipoRegistro(Id)
)
