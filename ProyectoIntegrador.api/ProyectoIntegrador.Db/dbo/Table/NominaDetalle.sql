CREATE TABLE [dbo].[NominaDetalle] (
	[NominaId] INT NOT NULL,
	[EmpleadoId] INT NOT NULL,
	[ConceptoId] INT NOT NULL,
	[Monto] DECIMAL(18, 2) NOT NULL,
	PRIMARY KEY (NominaId, EmpleadoId, ConceptoId),
	FOREIGN KEY (NominaId) REFERENCES Nomina(Id),
	FOREIGN KEY (EmpleadoId) REFERENCES Empleado(Id),
	FOREIGN KEY (ConceptoId) REFERENCES Concepto(Id)
)
