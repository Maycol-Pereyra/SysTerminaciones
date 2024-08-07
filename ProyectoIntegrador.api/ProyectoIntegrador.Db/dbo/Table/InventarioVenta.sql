CREATE TABLE [dbo].[InventarioVenta]
(
	[Id] INT PRIMARY KEY IDENTITY,
	[InventarioId] INT NOT NULL,
	FOREIGN KEY (InventarioId) REFERENCES Inventario(Id)
)
