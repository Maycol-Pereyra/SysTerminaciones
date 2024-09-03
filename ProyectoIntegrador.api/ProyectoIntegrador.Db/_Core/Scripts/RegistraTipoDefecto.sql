PRINT'EJECUTANDO RegistraTipoDefecto'

SET NOCOUNT ON

MERGE INTO TipoDefecto AS target
USING (VALUES 
    (1, 'EstadoProduccion'),
    (2, 'EstadoHerramienta'),
    (3, 'TipoMovimiento'),
    (4, 'TipoFactura'),
    (5, 'Renglon'),
    (6, 'MedioPago'),
    (7, 'Turno'),
    (8, 'TipoNomina'),
    (9, 'TipoComprobante'),
    (10, 'EstadoDesgloseCorredera'),
    (11, 'EstadoDespacho'),
    (12, 'EstadoDistribucionEnvio'),
    (13, 'EstadoEnsamblado'),
    (14, 'EstadoEnvio'),
    (15, 'EstadoInventario'),
    (16, 'EstadoVehiculo'),
    (17, 'EstadoSolicitudTomaMedida'),
    (18, 'EstadoCotizacion'),
    (19, 'EstadoFactura')

) AS source (Id, Descripcion)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
        target.Descripcion = source.Descripcion
WHEN NOT MATCHED THEN
    INSERT (Id, Descripcion, FechaCreacion, EstaActivo)
    VALUES (source.Id, source.Descripcion);

SET NOCOUNT OFF

PRINT'RegistraTipoDefecto EJECUTADO CON ÉXITO'