CREATE TABLE [dbo].[RectificarMedidaDetalle]
(
	[RectificarMedidaId] INT NOT NULL,
	[TomaMedidaId] INT NOT NULL,
	PRIMARY KEY (RectificarMedidaId, TomaMedidaId),
	FOREIGN KEY (RectificarMedidaId) REFERENCES RectificarMedida(Id),
	FOREIGN KEY (TomaMedidaId) REFERENCES TomaMedida(Id)
)
