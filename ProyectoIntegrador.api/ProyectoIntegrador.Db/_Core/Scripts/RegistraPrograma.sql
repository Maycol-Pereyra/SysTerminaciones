PRINT'EJECUTANDO RegistraPrograma'

SET NOCOUNT ON

DECLARE @ModuloGeneralesId INT
DECLARE @ModuloVentasId INT
DECLARE @ModuloComprasId INT
DECLARE @ModuloFabricacionId INT
DECLARE @ModuloDistribucionId INT
DECLARE @ModuloNominaId INT
DECLARE @TipoProgramaRegistroId INT
DECLARE @TipoProgramaProcesoId INT
DECLARE @TipoProgramaReporteId INT

SET @ModuloGeneralesId = 0
SET @ModuloVentasId = 0
SET @ModuloComprasId = 0
SET @ModuloFabricacionId = 0
SET @ModuloDistribucionId = 0
SET @ModuloNominaId = 0
SET @TipoProgramaRegistroId = 0
SET @TipoProgramaProcesoId = 0
SET @TipoProgramaReporteId = 0

SELECT @ModuloGeneralesId = Id FROM Registro WHERE TipoRegistroId = 4 AND Descripcion = 'Generales'
SELECT @ModuloVentasId = Id FROM Registro WHERE TipoRegistroId = 4 AND Descripcion = 'Ventas'
SELECT @ModuloComprasId = Id FROM Registro WHERE TipoRegistroId = 4 AND Descripcion = 'Compras'
SELECT @ModuloFabricacionId = Id FROM Registro WHERE TipoRegistroId = 4 AND Descripcion = 'Fabricación'
SELECT @ModuloDistribucionId = Id FROM Registro WHERE TipoRegistroId = 4 AND Descripcion = 'Distribución'
SELECT @ModuloNominaId = Id FROM Registro WHERE TipoRegistroId = 4 AND Descripcion = 'Nómina'
SELECT @TipoProgramaRegistroId = Id FROM Registro WHERE TipoRegistroId = 24 AND Descripcion = 'Registro'
SELECT @TipoProgramaProcesoId = Id FROM Registro WHERE TipoRegistroId = 24 AND Descripcion = 'Proceso'
SELECT @TipoProgramaReporteId = Id FROM Registro WHERE TipoRegistroId = 24 AND Descripcion = 'Reporte'

MERGE INTO Programa AS target
USING (VALUES 
    (1, @ModuloVentasId, @TipoProgramaRegistroId, 'Clientes', 'registries/customers', '', 0),
    (2, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Paises', 'registries/countries', '', 0),
    (3, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Provincias', 'registries/provinces', '', 0),
    (4, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Ciudades', 'registries/cities', '', 0),
    (5, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Sectores', 'registries/sectors', '', 0),
    (6, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Almacenes', 'registries/warehouses', '', 0),
    (7, @ModuloVentasId, @TipoProgramaRegistroId, 'Cajas', 'registries/cashRegisters', '', 0),
    (8, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Empleados', 'registries/employees', '', 0),
    (9, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Herramientas', 'registries/tools', '', 0),
    (10, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Perfiles', 'registries/profiles', '', 0),
    (11, @ModuloVentasId, @TipoProgramaRegistroId, 'Productos', 'registries/products', '', 0),
    (12, @ModuloComprasId, @TipoProgramaRegistroId, 'Suplidores', 'registries/suppliers', '', 0),
    (13, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Unidades', 'registries/units', '', 0),
    (14, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Usuarios', 'registries/users', '', 0),
    (15, @ModuloGeneralesId, @TipoProgramaRegistroId, 'Vehiculos', 'registries/vehicles', '', 0),
    (16, @ModuloVentasId, @TipoProgramaProcesoId, 'Cotización', 'process/quotes', '', 0),
    (17, @ModuloGeneralesId, @TipoProgramaProcesoId, 'Valoración de Usuario', 'process/user-rating', '', 0)

) AS source (Id, ModuloId, TipoProgramaId, Descripcion, Ruta, Icono, Orden)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
        target.ModuloId = source.ModuloId, 
        target.TipoProgramaId = source.TipoProgramaId, 
        target.Descripcion = source.Descripcion, 
        target.Ruta = source.Ruta, 
        target.Icono = source.Icono, 
        target.Orden = source.Orden

WHEN NOT MATCHED THEN
    INSERT (Id, ModuloId, TipoProgramaId, Descripcion, Ruta, Icono, Orden)
    VALUES (source.Id, source.ModuloId, source.TipoProgramaId, source.Descripcion, source.Ruta, source.Icono, source.Orden);

SET NOCOUNT OFF

PRINT'RegistraPrograma EJECUTANDO CON ÉXITO'