﻿PRINT 'EJUCUTADO RegistraAcceso'

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

, (N'ventas.producto.acceder', N'Ventas', N'Acceso de Producto', N'Acceder', N'')
, (N'ventas.producto.crear', N'Ventas', N'Acceso de Producto', N'Crear', N'')
, (N'ventas.producto.editar', N'Ventas', N'Acceso de Producto', N'Editar', N'')
, (N'ventas.producto.activar', N'Ventas', N'Acceso de Producto', N'Activar', N'')
, (N'ventas.producto.inactivar', N'Ventas', N'Acceso de Producto', N'Inactivar', N'')

, (N'ventas.categoria.acceder', N'Ventas', N'Acceso de Categoría', N'Acceder', N'')
, (N'ventas.categoria.crear', N'Ventas', N'Acceso de Categoría', N'Crear', N'')
, (N'ventas.categoria.editar', N'Ventas', N'Acceso de Categoría', N'Editar', N'')
, (N'ventas.categoria.activar', N'Ventas', N'Acceso de Categoría', N'Activar', N'')
, (N'ventas.categoria.inactivar', N'Ventas', N'Acceso de Categoría', N'Inactivar', N'')

, (N'ventas.solicitud-toma-medida.acceder', N'Ventas', N'Acceso de Solicitud de Toma de Medida', N'Acceder', N'')
, (N'ventas.solicitud-toma-medida.crear', N'Ventas', N'Acceso de Solicitud de Toma de Medida', N'Crear', N'')
, (N'ventas.solicitud-toma-medida.editar', N'Ventas', N'Acceso de Solicitud de Toma de Medida', N'Editar', N'')
, (N'ventas.solicitud-toma-medida.ver-info', N'Ventas', N'Acceso de Solicitud de Toma de Medida', N'Ver Información', N'')
, (N'ventas.solicitud-toma-medida.tomar-medida', N'Ventas', N'Acceso de Solicitud de Toma de Medida', N'Tomar Medidas', N'')

, (N'ventas.cotizacion.acceder', N'Ventas', N'Acceso de Cotización', N'Acceder', N'')
, (N'ventas.cotizacion.crear', N'Ventas', N'Acceso de Cotización', N'Crear', N'')
, (N'ventas.cotizacion.editar', N'Ventas', N'Acceso de Cotización', N'Editar', N'')
, (N'ventas.cotizacion.ver-info', N'Ventas', N'Acceso de Cotización', N'Ver Información', N'')

, (N'ventas.factura.acceder', N'Ventas', N'Acceso de Factura', N'Acceder', N'')
, (N'ventas.factura.crear', N'Ventas', N'Acceso de Factura', N'Crear', N'')
, (N'ventas.factura.editar', N'Ventas', N'Acceso de Factura', N'Editar', N'')
, (N'ventas.factura.facturar', N'Ventas', N'Acceso de Factura', N'Facturar', N'')
, (N'ventas.factura.ver-info', N'Ventas', N'Acceso de Factura', N'Ver Información', N'')

, (N'ventas.caja.acceder', N'Ventas', N'Acceso de Caja', N'Acceder', N'')
, (N'ventas.caja.crear', N'Ventas', N'Acceso de Caja', N'Crear', N'')
, (N'ventas.caja.editar', N'Ventas', N'Acceso de Caja', N'Editar', N'')
, (N'ventas.caja.activar', N'Ventas', N'Acceso de Caja', N'Activar', N'')
, (N'ventas.caja.inactivar', N'Ventas', N'Acceso de Caja', N'Inactivar', N'')
, (N'ventas.caja.abrir', N'Ventas', N'Acceso de Caja', N'Abrir', N'')
, (N'ventas.caja.cerrar', N'Ventas', N'Acceso de Caja', N'Cerrar', N'')

, (N'compras.suplidor.acceder', N'Compras', N'Acceso de Suplidor', N'Acceder', N'')
, (N'compras.suplidor.crear', N'Compras', N'Acceso de Suplidor', N'Crear', N'')
, (N'compras.suplidor.editar', N'Compras', N'Acceso de Suplidor', N'Editar', N'')
, (N'compras.suplidor.activar', N'Compras', N'Acceso de Suplidor', N'Activar', N'')
, (N'compras.suplidor.inactivar', N'Compras', N'Acceso de Suplidor', N'Inactivar', N'')

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

PRINT'RegistraAcceso EJECUTADO CON ÉXITO'