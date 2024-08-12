PRINT 'EJUCUTADO RegistraAcceso'

SET NOCOUNT ON

MERGE INTO Acceso AS Target
USING (VALUES

  (N'generales.usuario.acceder', N'Generales', N'Acceso de Usuarios', N'Acceder', N'')
, (N'generales.usuario.crear', N'Generales', N'Acceso de Usuarios', N'Crear', N'')
, (N'generales.usuario.editar', N'Generales', N'Acceso de Usuarios', N'Editar', N'')
, (N'generales.usuario.activar', N'Generales', N'Acceso de Usuarios', N'Activar', N'')
, (N'generales.usuario.inactivar', N'Generales', N'Acceso de Usuarios', N'Inactivar', N'')

, (N'generales.perfil.acceder', N'Generales', N'Acceso de Perfil', N'Acceder', N'')
, (N'generales.perfil.crear', N'Generales', N'Acceso de Perfil', N'Crear', N'')
, (N'generales.perfil.editar', N'Generales', N'Acceso de Perfil', N'Editar', N'')
, (N'generales.perfil.activar', N'Generales', N'Acceso de Perfil', N'Activar', N'')
, (N'generales.perfil.inactivar', N'Generales', N'Acceso de Perfil', N'Inactivar', N'')

, (N'generales.pais.acceder', N'Generales', N'Acceso de País', N'Acceder', N'')
, (N'generales.pais.crear', N'Generales', N'Acceso de País', N'Crear', N'')
, (N'generales.pais.editar', N'Generales', N'Acceso de País', N'Editar', N'')
, (N'generales.pais.activar', N'Generales', N'Acceso de País', N'Activar', N'')
, (N'generales.pais.inactivar', N'Generales', N'Acceso de País', N'Inactivar', N'')

, (N'generales.provincia.acceder', N'Generales', N'Acceso de Provincia', N'Acceder', N'')
, (N'generales.provincia.crear', N'Generales', N'Acceso de Provincia', N'Crear', N'')
, (N'generales.provincia.editar', N'Generales', N'Acceso de Provincia', N'Editar', N'')
, (N'generales.provincia.activar', N'Generales', N'Acceso de Provincia', N'Activar', N'')
, (N'generales.provincia.inactivar', N'Generales', N'Acceso de Provincia', N'Inactivar', N'')

, (N'generales.ciudad.acceder', N'Generales', N'Acceso de Ciudad', N'Acceder', N'')
, (N'generales.ciudad.crear', N'Generales', N'Acceso de Ciudad', N'Crear', N'')
, (N'generales.ciudad.editar', N'Generales', N'Acceso de Ciudad', N'Editar', N'')
, (N'generales.ciudad.activar', N'Generales', N'Acceso de Ciudad', N'Activar', N'')
, (N'generales.ciudad.inactivar', N'Generales', N'Acceso de Ciudad', N'Inactivar', N'')

, (N'generales.sector.acceder', N'Generales', N'Acceso de Sector', N'Acceder', N'')
, (N'generales.sector.crear', N'Generales', N'Acceso de Sector', N'Crear', N'')
, (N'generales.sector.editar', N'Generales', N'Acceso de Sector', N'Editar', N'')
, (N'generales.sector.activar', N'Generales', N'Acceso de Sector', N'Activar', N'')
, (N'generales.sector.inactivar', N'Generales', N'Acceso de Sector', N'Inactivar', N'')

, (N'generales.herramienta.acceder', N'Generales', N'Acceso de Herramienta', N'Acceder', N'')
, (N'generales.herramienta.crear', N'Generales', N'Acceso de Herramienta', N'Crear', N'')
, (N'generales.herramienta.editar', N'Generales', N'Acceso de Herramienta', N'Editar', N'')
, (N'generales.herramienta.activar', N'Generales', N'Acceso de Herramienta', N'Activar', N'')
, (N'generales.herramienta.inactivar', N'Generales', N'Acceso de Herramienta', N'Inactivar', N'')

, (N'generales.unidad.acceder', N'Generales', N'Acceso de Unidad', N'Acceder', N'')
, (N'generales.unidad.crear', N'Generales', N'Acceso de Unidad', N'Crear', N'')
, (N'generales.unidad.editar', N'Generales', N'Acceso de Unidad', N'Editar', N'')
, (N'generales.unidad.activar', N'Generales', N'Acceso de Unidad', N'Activar', N'')
, (N'generales.unidad.inactivar', N'Generales', N'Acceso de Unidad', N'Inactivar', N'')

, (N'generales.vehiculo.acceder', N'Generales', N'Acceso de Vehiculo', N'Acceder', N'')
, (N'generales.vehiculo.crear', N'Generales', N'Acceso de Vehiculo', N'Crear', N'')
, (N'generales.vehiculo.editar', N'Generales', N'Acceso de Vehiculo', N'Editar', N'')
, (N'generales.vehiculo.activar', N'Generales', N'Acceso de Vehiculo', N'Activar', N'')
, (N'generales.vehiculo.inactivar', N'Generales', N'Acceso de Vehiculo', N'Inactivar', N'')

, (N'generales.color.acceder', N'Generales', N'Acceso de Color', N'Acceder', N'')
, (N'generales.color.crear', N'Generales', N'Acceso de Color', N'Crear', N'')
, (N'generales.color.editar', N'Generales', N'Acceso de Color', N'Editar', N'')
, (N'generales.color.activar', N'Generales', N'Acceso de Color', N'Activar', N'')
, (N'generales.color.inactivar', N'Generales', N'Acceso de Color', N'Inactivar', N'')

, (N'generales.empleado.acceder', N'Generales', N'Acceso de Empleado', N'Acceder', N'')
, (N'generales.empleado.crear', N'Generales', N'Acceso de Empleado', N'Crear', N'')
, (N'generales.empleado.editar', N'Generales', N'Acceso de Empleado', N'Editar', N'')
, (N'generales.empleado.activar', N'Generales', N'Acceso de Empleado', N'Activar', N'')
, (N'generales.empleado.inactivar', N'Generales', N'Acceso de Empleado', N'Inactivar', N'')

, (N'generales.departamento.acceder', N'Generales', N'Acceso de Departamento', N'Acceder', N'')
, (N'generales.departamento.crear', N'Generales', N'Acceso de Departamento', N'Crear', N'')
, (N'generales.departamento.editar', N'Generales', N'Acceso de Departamento', N'Editar', N'')
, (N'generales.departamento.activar', N'Generales', N'Acceso de Departamento', N'Activar', N'')
, (N'generales.departamento.inactivar', N'Generales', N'Acceso de Departamento', N'Inactivar', N'')

, (N'generales.posicion.acceder', N'Generales', N'Acceso de Posición', N'Acceder', N'')
, (N'generales.posicion.crear', N'Generales', N'Acceso de Posición', N'Crear', N'')
, (N'generales.posicion.editar', N'Generales', N'Acceso de Posición', N'Editar', N'')
, (N'generales.posicion.activar', N'Generales', N'Acceso de Posición', N'Activar', N'')
, (N'generales.posicion.inactivar', N'Generales', N'Acceso de Posición', N'Inactivar', N'')

, (N'ventas.cliente.acceder', N'Ventas', N'Acceso de Cliente', N'Acceder', N'')
, (N'ventas.cliente.crear', N'Ventas', N'Acceso de Cliente', N'Crear', N'')
, (N'ventas.cliente.editar', N'Ventas', N'Acceso de Cliente', N'Editar', N'')
, (N'ventas.cliente.activar', N'Ventas', N'Acceso de Cliente', N'Activar', N'')
, (N'ventas.cliente.inactivar', N'Ventas', N'Acceso de Cliente', N'Inactivar', N'')


) 
AS source (Id,Modulo,Opcion,Permiso,Descripcion)
ON target.Id = source.Id
WHEN MATCHED THEN 
    UPDATE SET 
		target.Modulo = source.Modulo,
		target.Opcion = source.Opcion,
		target.Permiso = source.Permiso,
		target.Descripcion = source.Descripcion
WHEN NOT MATCHED THEN
    INSERT (Id,Modulo,Opcion,Permiso,Descripcion)
    VALUES (source.Id, source.Modulo, source.Opcion, source.Permiso, source.Descripcion);

GO

SET NOCOUNT OFF
GO

PRINT'RegistraAcceso EJECUTANDO CON ÉXITO'