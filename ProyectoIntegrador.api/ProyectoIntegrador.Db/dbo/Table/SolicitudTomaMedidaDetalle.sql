CREATE TABLE [dbo].[SolicitudTomaMedidaDetalle] (
	[SolicitudTomaMedidaId] INT NOT NULL,
	[TomaMedidaId] INT NOT NULL,
	PRIMARY KEY (SolicitudTomaMedidaId, TomaMedidaId),
	FOREIGN KEY (SolicitudTomaMedidaId) REFERENCES SolicitudTomaMedida(Id),
	FOREIGN KEY (TomaMedidaId) REFERENCES TomaMedida(Id)
)
