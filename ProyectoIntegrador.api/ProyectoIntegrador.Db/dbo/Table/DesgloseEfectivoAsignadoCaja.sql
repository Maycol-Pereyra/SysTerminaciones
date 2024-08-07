CREATE TABLE [dbo].[DesgloseEfectivoAsignadoCaja] (
	[Id] INT PRIMARY KEY IDENTITY,
	[AperturaId] INT NOT NULL,
	[ValorMoneda] INT NOT NULL,
	[Cantidad] INT NOT NULL,
	FOREIGN KEY (AperturaId) REFERENCES AperturaCaja(Id)
)