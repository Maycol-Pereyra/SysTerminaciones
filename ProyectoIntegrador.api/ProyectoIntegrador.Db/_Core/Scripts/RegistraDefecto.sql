PRINT'EJECUTANDO RegistraDefecto'

MERGE INTO Defecto AS target
USING (VALUES 
	-- Inicio Tabla Turno
	(1, 7, 'Matutino'),
	(2, 7, 'Vespertino'),
	(3, 7, 'Nocturno'),
	-- Fin Tabla Turno

	-- Inicio Tabla MedioPago
	(4, 6, 'Efectivo'),
	(5, 6, 'Tarjeta'),
	-- Fin Tabla MedioPago

	-- Inicio Tabla EstadoDesgloseCorredera
	(6, 10, 'Asignado'),
	(7, 10, 'En Proceso'),
	(8, 10, 'En Pausa'),
	(9, 10, 'Concluido'),
	(10, 10, 'Distribución'),
	(11, 10, 'Devuelto por Calidad'),
	-- Fin Tabla EstadoDesgloseCorredera

	-- Inicio Tabla EstadoDespacho
	(12, 11, 'Pendiente Fabricación'),
	(13, 11, 'Pendiente de Recoger por Cliente'),
	(14, 11, 'Pendiente de Instalación'),
	(15, 11, 'Pendiente de Envío'),
	(16, 11, 'Devuelto por Calidad'),
	(17, 11, 'Despachado'),
	-- Fin Tabla EstadoDespacho

	-- Inicio Tabla EstadoSolicitudTomaMedida
	(18, 17, 'Pendiente Tomar Medidas'),
	(19, 17, 'En Proceso'),
	(20, 17, 'Concluido'),
	-- Fin Tabla EstadoSolicitudTomaMedida

	-- Inicio Tabla EstadoInventario
	(21, 15, 'Disponible'),
	(22, 15, 'Reservado'),
	(23, 15, 'No Disponible'),
	-- Fin Tabla EstadoInventario

	-- Inicio Tabla EstadoHerramienta
	(24, 2, 'Disponible'),
	(25, 2, 'Asignada'),
	(26, 2, 'En Uso'),
	(27, 2, 'En Reparación'),
	(28, 2, 'Inactivo'),
	-- Fin Tabla EstadoHerramienta

	-- Inicio Tabla EstadoVehiculo
	(29, 16, 'Disponible'),
	(30, 16, 'Asignada'),
	(31, 16, 'En Ruta'),
	(32, 16, 'En Reparación'),
	(33, 16, 'Inactivo'),
	-- Fin Tabla EstadoVehiculo

	-- Inicio Tabla EstadoCotizacion
	(34, 18, 'En Proceso'),
	(35, 18, 'Entregada al Cliente'),
	(36, 18, 'Rechazada por Cliente'),
	(37, 18, 'Cancelada por Cliente'),
	(38, 18, 'Aceptada'),
	(39, 18, 'Inactiva'),
	-- Fin Tabla EstadoCotizacion

	-- Inicio Tabla EstadoFactura
	(40, 19, 'En Proceso'),
	(41, 19, 'Devuelta por Cliente'),
	(42, 19, 'Facturada'),
	(43, 19, 'Inactiva'),
	-- Fin Tabla EstadoFactura

	-- Inicio Tabla EstadoProduccion
	(47, 1, 'En Proceso'),
	(48, 1, 'Devuelta por Cliente'),
	(49, 1, 'Facturada'),
	(50, 1, 'Inactiva'),
	-- Fin Tabla EstadoProduccion

	-- Inicio Tabla TipoProduccionFabricacion
	(51, 20, 'Fabricación'),
	(52, 20, 'Instalación'),
	-- Fin Tabla TipoProduccionFabricacion

	-- Inicio Tabla TipoMedida
	(53, 21, 'Pulgadas'),
	(54, 21, 'Centímetros'),
	(53, 21, 'Piés')
	-- Fin Tabla TipoMedida

) AS source (Id, TipoDefectoId, Descripcion)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
		target.TipoDefectoId = source.TipoDefectoId,
		target.Descripcion = source.Descripcion
WHEN NOT MATCHED THEN
    INSERT (Id, TipoDefectoId, Descripcion)
    VALUES (source.Id, source.TipoDefectoId, source.Descripcion);

PRINT'RegistraDefecto EJECUTADO CON ÉXITO'