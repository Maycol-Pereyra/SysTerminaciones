PRINT'EJECUTANDO RegistraDatosBaseTablaRegistro'

SET IDENTITY_INSERT Registro ON

MERGE INTO Registro AS target
USING (VALUES 
    -- Inicio Tabla TipoIdentificacion
	(1, 15, 'Cédula', GETDATE(), GETDATE(), 1),
	(2, 15, 'Rnc', GETDATE(), GETDATE(), 1),
	(3, 15, 'Rnc Tipo Cédula', GETDATE(), GETDATE(), 1),
	(4, 15, 'Pasaporte', GETDATE(), GETDATE(), 1),
	-- Fin Tabla TipoIdentificacion

	-- Inicio Tabla Turno
	(5, 13, 'Matutino', GETDATE(), GETDATE(), 1),
	(6, 13, 'Vespertino', GETDATE(), GETDATE(), 1),
	(7, 13, 'Nocturno', GETDATE(), GETDATE(), 1),
	-- Fin Tabla Turno

	-- Inicio Tabla MedioPago
	(8, 12, 'Efectivo', GETDATE(), GETDATE(), 1),
	(9, 12, 'Tarjeta', GETDATE(), GETDATE(), 1),
	-- Fin Tabla MedioPago

	-- Inicio Tabla Modulo
	(10, 4, 'Generales', GETDATE(), GETDATE(), 1),
	(11, 4, 'Ventas', GETDATE(), GETDATE(), 1),
	(12, 4, 'Compras', GETDATE(), GETDATE(), 1),
	(13, 4, 'Fabricación', GETDATE(), GETDATE(), 1),
	(14, 4, 'Distribución', GETDATE(), GETDATE(), 1),
	(15, 4, 'Nómina', GETDATE(), GETDATE(), 1),
	-- Fin Tabla Modulo

	-- Inicio Tabla EstadoDesgloseCorredera
	(16, 17, 'Asignado', GETDATE(), GETDATE(), 1),
	(17, 17, 'En Proceso', GETDATE(), GETDATE(), 1),
	(18, 17, 'En Pausa', GETDATE(), GETDATE(), 1),
	(19, 17, 'Concluido', GETDATE(), GETDATE(), 1),
	(20, 17, 'Distribución', GETDATE(), GETDATE(), 1),
	(21, 17, 'Devuelto por Calidad', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoDesgloseCorredera

	-- Inicio Tabla EstadoDespacho
	(22, 18, 'Pendiente Fabricación', GETDATE(), GETDATE(), 1),
	(23, 18, 'Pendiente de Recoger por Cliente', GETDATE(), GETDATE(), 1),
	(24, 18, 'Pendiente de Instalación', GETDATE(), GETDATE(), 1),
	(25, 18, 'Pendiente de Envío', GETDATE(), GETDATE(), 1),
	(26, 18, 'Devuelto por Calidad', GETDATE(), GETDATE(), 1),
	(27, 18, 'Despachado', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoDespacho

	-- Inicio Tabla EstadoSolicitudTomaMedida
	(28, 26, 'Pendiente Tomar Medidas', GETDATE(), GETDATE(), 1),
	(29, 26, 'En Proceso', GETDATE(), GETDATE(), 1),
	(30, 26, 'Concluido', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoSolicitudTomaMedida

	-- Inicio Tabla EstadoInventario
	(31, 22, 'Disponible', GETDATE(), GETDATE(), 1),
	(32, 22, 'Reservado', GETDATE(), GETDATE(), 1),
	(33, 22, 'No Disponible', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoInventario

	-- Inicio Tabla EstadoHerramienta
	(34, 8, 'Disponible', GETDATE(), GETDATE(), 1),
	(35, 8, 'Asignada', GETDATE(), GETDATE(), 1),
	(36, 8, 'En Uso', GETDATE(), GETDATE(), 1),
	(37, 8, 'En Reparación', GETDATE(), GETDATE(), 1),
	(38, 8, 'Inactivo', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoHerramienta

	-- Inicio Tabla EstadoVehiculo
	(39, 25, 'Disponible', GETDATE(), GETDATE(), 1),
	(40, 25, 'Asignada', GETDATE(), GETDATE(), 1),
	(41, 25, 'En Ruta', GETDATE(), GETDATE(), 1),
	(42, 25, 'En Reparación', GETDATE(), GETDATE(), 1),
	(43, 25, 'Inactivo', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoVehiculo

	-- Inicio Tabla EstadoCotizacion
	(44, 27, 'En Proceso', GETDATE(), GETDATE(), 1),
	(45, 27, 'Entregada al Cliente', GETDATE(), GETDATE(), 1),
	(46, 27, 'Rechazada por Cliente', GETDATE(), GETDATE(), 1),
	(47, 27, 'Cancelada por Cliente', GETDATE(), GETDATE(), 1),
	(48, 27, 'Aceptada', GETDATE(), GETDATE(), 1),
	(49, 27, 'Inactiva', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoCotizacion

	-- Inicio Tabla EstadoFactura
	(50, 28, 'En Proceso', GETDATE(), GETDATE(), 1),
	(51, 28, 'Devuelta por Cliente', GETDATE(), GETDATE(), 1),
	(52, 28, 'Facturada', GETDATE(), GETDATE(), 1),
	(53, 28, 'Inactiva', GETDATE(), GETDATE(), 1),
	-- Fin Tabla EstadoFactura

	-- Inicio Tabla Turno
	(54, 15, 'Matutino', GETDATE(), GETDATE(), 1),
	(55, 15, 'Vespertino', GETDATE(), GETDATE(), 1),
	(56, 15, 'Nocturno', GETDATE(), GETDATE(), 1),
	-- Fin Tabla Turno

	-- Inicio Tabla EstadoProduccion
	(57, 7, 'En Proceso', GETDATE(), GETDATE(), 1),
	(58, 7, 'Devuelta por Cliente', GETDATE(), GETDATE(), 1),
	(59, 7, 'Facturada', GETDATE(), GETDATE(), 1),
	(60, 7, 'Inactiva', GETDATE(), GETDATE(), 1)
	-- Fin Tabla EstadoProduccion

) AS source (Id, TipoRegistroId, Descripcion, FechaModificacion, FechaCreacion, EstaActivo)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
		target.TipoRegistroId = source.TipoRegistroId,
		target.Descripcion = source.Descripcion,
		target.FechaModificacion = source.FechaModificacion,
		target.FechaCreacion = source.FechaCreacion,
		target.EstaActivo = source.EstaActivo
WHEN NOT MATCHED THEN
    INSERT (Id, TipoRegistroId, Descripcion, FechaModificacion, FechaCreacion, EstaActivo)
    VALUES (source.Id, source.TipoRegistroId, source.Descripcion, source.FechaModificacion, source.FechaCreacion, source.EstaActivo);
	
SET IDENTITY_INSERT Registro OFF

PRINT'RegistraDatosBaseTablaRegistro EJECUTANDO CON ÉXITO'