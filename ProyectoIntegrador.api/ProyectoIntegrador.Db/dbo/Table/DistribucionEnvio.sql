CREATE TABLE [dbo].[DistribucionEnvio]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[EstadoId] INT NOT NULL,
	[FechaDistribucion] DATETIME NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	[EstaActivo] BIT NOT NULL,
	FOREIGN KEY (EstadoId) REFERENCES Defecto(Id)
)