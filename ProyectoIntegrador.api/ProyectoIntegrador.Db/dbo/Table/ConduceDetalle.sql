CREATE TABLE [dbo].[ConduceDetalle] (
	[ConduceId] INT NOT NULL,
	[ProductoId] INT NOT NULL,
	[Cantidad] INT NOT NULL,
	FOREIGN KEY (ConduceId) REFERENCES Conduce(Id),
	FOREIGN KEY (ProductoId) REFERENCES Producto(Id)
)
