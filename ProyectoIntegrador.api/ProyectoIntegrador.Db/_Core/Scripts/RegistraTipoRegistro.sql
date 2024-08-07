PRINT'EJECUTANDO RegistraTipoRegistro'

SET NOCOUNT ON

MERGE INTO TipoRegistro AS target
USING (VALUES 
    (1, 'Categoria', GETDATE(), 1),
    (2, 'Departamento', GETDATE(), 1),
    (3, 'Posicion', GETDATE(), 1),
    (4, 'Modulo', GETDATE(), 1),
    (5, 'Color', GETDATE(), 1),
    (6, 'Pais', GETDATE(), 1),
    (7, 'Estado', GETDATE(), 1),
    (8, 'Herramienta', GETDATE(), 1),
    (9, 'TipoMovimiento', GETDATE(), 1),
    (10, 'TipoFactura', GETDATE(), 1),
    (11, 'Renglon', GETDATE(), 1),
    (12, 'MedioPago', GETDATE(), 1),
    (13, 'Turno', GETDATE(), 1),
    (14, 'TipoNomina', GETDATE(), 1),
    (15, 'TipoIdentificacion', GETDATE(), 1),
    (16, 'TipoComprobante', GETDATE(), 1),
    (17, 'EstadoDesgloseCorredera', GETDATE(), 1),
    (18, 'EstadoDespacho', GETDATE(), 1),
    (19, 'EstadoDistribucionEnvio', GETDATE(), 1),
    (20, 'EstadoEnsamblado', GETDATE(), 1),
    (21, 'EstadoEnvio', GETDATE(), 1),
    (22, 'EstadoInventario', GETDATE(), 1),
    (23, 'Perfil', GETDATE(), 1),
    (24, 'TipoPrograma', GETDATE(), 1),
    (25, 'EstadoVehiculo', GETDATE(), 1),
    (26, 'EstadoSolicitudTomaMedida', GETDATE(), 1)

) AS source (Id, Descripcion, FechaCreacion, EstaActivo)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
        target.Descripcion = source.Descripcion,
        target.FechaCreacion = source.FechaCreacion,
        target.EstaActivo = source.EstaActivo
WHEN NOT MATCHED THEN
    INSERT (Id, Descripcion, FechaCreacion, EstaActivo)
    VALUES (source.Id, source.Descripcion, source.FechaCreacion, source.EstaActivo);

SET NOCOUNT OFF

PRINT'RegistraTipoRegistro EJECUTANDO CON ÉXITO'