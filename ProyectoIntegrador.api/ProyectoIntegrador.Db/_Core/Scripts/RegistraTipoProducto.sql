PRINT'EJECUTANDO RegistraTipoProducto'

SET NOCOUNT ON

MERGE INTO TipoProducto AS target
USING (VALUES 
    (1, 'Ventana Corrediza Tradicional de 2 Vías', 1, 1, 0, 0, 1, 0.375, 4, 0.25, 0.875, 4, 0.5, 4, 2, 2, 2, 2, 2),
    (2, 'Ventana Corrediza Tradicional de 3 Vías', 1, 1, 0, 0, 1, 0, 5.25, 0.25, 0.875, 4, 0.5, 6, 2, 2, 4, 2, 3),
    (3, 'Ventana Corrediza P-65 de 2 Vías', 1, 1, 0, 0, 1, 1.25, 6.625, 1.5, 2, 4.875, 0.125, 4, 2, 2, 2, 2, 2),
    (4, 'Ventana Corrediza P-65 de 3 Vías', 1, 1, 0, 0, 1, 0.125, 7.75, 1.5, 2, 4.875, 0.125, 6, 2, 2, 4, 2, 3),
    (5, 'Ventana Corrediza P-92 de 2 Vías', 1, 1, 0, 0, 1, 0.875, 7.5, 1.625, 2.375, 6.375, 0.125, 4, 2, 2, 2, 2, 2),
    (6, 'Ventana Corrediza P-92 de 3 Vías', 1, 1, 0, 0, 1, 0.75, 9.1875, 1.5, 2, 4.875, 0.125, 6, 2, 2, 4, 2, 3),
    (7, 'Puerta Corrediza Tradicional de 2 Vías', 1, 1, 0, 0, 1, 0.375, 4, 0.25, 0.875, 4, 0.5, 4, 2, 2, 2, 2, 2),
    (8, 'Puerta Corrediza Tradicional de 3 Vías', 1, 1, 0, 0, 1, 0, 5.25, 0.25, 0.875, 4, 0.5, 6, 2, 2, 4, 2, 3),
    (9, 'Puerta Corrediza P-65 de 2 Vías', 1, 1, 0, 0, 1, 1.25, 6.625, 1.5, 1.25, 4, 0.125, 4, 2, 2, 2, 2, 2),
    (10, 'Puerta Corrediza P-65 de 3 Vías', 1, 1, 0, 0, 1, 0.125, 7.75, 1.5, 1.25, 4, 0.125, 6, 2, 2, 4, 2, 3),
    (11, 'Puerta Corrediza P-92 de 2 Vías', 1, 1, 0, 0, 1, 0.875, 7.5, 1.625, 1.5, 5.5, 0.125, 4, 2, 2, 2, 2, 2),
    (12, 'Puerta Corrediza P-92 de 3 Vías', 1, 1, 0, 0, 1, 0.75, 9.1875, 1.5, 1.5, 5.5, 0.125, 6, 2, 2, 4, 2, 3),
    (13, 'Material', 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    (14, 'Accesorio', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    (15, 'Alfeizar', 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    (16, 'Cabezal', 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    (17, 'Llavin', 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    (18, 'Enganche', 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    (19, 'Riel Superior', 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
    (20, 'Riel Inferior', 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)

    
) AS source (Id, Descripcion, UsaMedidaAncho, UsaMedidaAlto, UsaDescuento, UsaDivision, UsaInstalacion, DescuentoCabezal, DescuentoVidrioAncho, DescuentoRiel, DescuentoLlavinEnganche, DescuentoVidrioAlto, DescuentoLateral, CantidadCabezal, CantidadRiel, CantidadLlavin, CantidadEnganche, CantidadLateral, CantidadVidrio)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
		target.Descripcion = source.Descripcion,
		target.UsaMedidaAncho = source.UsaMedidaAncho,
		target.UsaMedidaAlto = source.UsaMedidaAlto,
		target.UsaDescuento = source.UsaDescuento,
		target.UsaDivision = source.UsaDivision,
		target.UsaInstalacion = source.UsaInstalacion,
		target.DescuentoCabezal = source.DescuentoCabezal,
		target.DescuentoVidrioAncho = source.DescuentoVidrioAncho,
		target.DescuentoRiel = source.DescuentoRiel,
		target.DescuentoLlavinEnganche = source.DescuentoLlavinEnganche,
		target.DescuentoVidrioAlto = source.DescuentoVidrioAlto,
		target.DescuentoLateral = source.DescuentoLateral,
		target.CantidadCabezal = source.CantidadCabezal,
		target.CantidadRiel = source.CantidadRiel,
		target.CantidadLlavin = source.CantidadLlavin,
		target.CantidadEnganche = source.CantidadEnganche,
		target.CantidadLateral = source.CantidadLateral,
		target.CantidadVidrio = source.CantidadVidrio
WHEN NOT MATCHED THEN
    INSERT (Id, Descripcion, UsaMedidaAncho, UsaMedidaAlto, UsaDescuento, UsaDivision, UsaInstalacion, DescuentoCabezal, DescuentoVidrioAncho, DescuentoRiel, DescuentoLlavinEnganche, DescuentoVidrioAlto, DescuentoLateral, CantidadCabezal, CantidadRiel, CantidadLlavin, CantidadEnganche, CantidadLateral, CantidadVidrio)
    VALUES (source.Id, source.Descripcion, source.UsaMedidaAncho, source.UsaMedidaAlto, source.UsaDescuento, source.UsaDivision, source.UsaInstalacion, source.DescuentoCabezal, source.DescuentoVidrioAncho, source.DescuentoRiel, source.DescuentoLlavinEnganche, source.DescuentoVidrioAlto, source.DescuentoLateral, source.CantidadCabezal, source.CantidadRiel, source.CantidadLlavin, source.CantidadEnganche, source.CantidadLateral, source.CantidadVidrio);

SET NOCOUNT OFF

PRINT'RegistraTipoProducto EJECUTANDO CON ÉXITO'