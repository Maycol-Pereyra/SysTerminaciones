CREATE TABLE [dbo].[TipoProducto] (
	[Id] INT PRIMARY KEY,
	[Descripcion] VARCHAR(50) NOT NULL,
	[UsaMedidasProducto] BIT NOT NULL,
	[UsaMedidasFactura] BIT NOT NULL,
	[UsaInstalacion]  BIT NOT NULL,
	[DescuentoCabezal] DECIMAL(10, 6) NOT NULL,
	[DescuentoVidrioAncho] DECIMAL(10, 6) NOT NULL,
	[DescuentoRiel] DECIMAL(10, 6) NOT NULL,
	[DescuentoLlavinEnganche] DECIMAL(10, 6) NOT NULL,
	[DescuentoVidrioAlto] DECIMAL(10, 6) NOT NULL,
	[DescuentoLateral] DECIMAL(10, 6) NOT NULL,
	[CantidadCabezal] INT NOT NULL,
	[CantidadRiel] INT NOT NULL,
	[CantidadLlavin] INT NOT NULL,
	[CantidadEnganche] INT NOT NULL,
	[CantidadLateral] INT NOT NULL,
	[CantidadVidrio] INT NOT NULL
)
