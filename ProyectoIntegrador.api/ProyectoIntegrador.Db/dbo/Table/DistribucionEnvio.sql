CREATE TABLE [dbo].[DistribucionEnvio]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[EstadoId] INT NOT NULL,
	[FechaDistribucion] DATETIME NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	foreign key (EstadoId) REFERENCES Registro(Id)
)