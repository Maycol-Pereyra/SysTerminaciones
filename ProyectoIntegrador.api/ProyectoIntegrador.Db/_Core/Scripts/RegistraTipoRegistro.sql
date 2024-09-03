PRINT'EJECUTANDO RegistraTipoRegistro'

SET NOCOUNT ON

MERGE INTO TipoRegistro AS target
USING (VALUES 
    (1, 'Categoria'),
    (2, 'Departamento'),
    (3, 'Posicion'),
    (4, 'Color')

) AS source (Id, Descripcion)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
        target.Descripcion = source.Descripcion
WHEN NOT MATCHED THEN
    INSERT (Id, Descripcion)
    VALUES (source.Id, source.Descripcion);

SET NOCOUNT OFF

PRINT'RegistraTipoRegistro EJECUTADO CON ÉXITO'