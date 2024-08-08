PRINT 'EJUCUTADO RegistraAcceso'

SET NOCOUNT ON

DELETE FROM Acceso
GO

MERGE INTO Acceso AS Target
USING (VALUES

  (N'generales.usuario.acceder', N'Generales - Usuarios', N'Acceso de Usuarios', N'Acceder', N'')
, (N'generales.usuario.crear', N'Generales - Usuarios', N'Acceso de Usuarios', N'Crear', N'')
, (N'generales.usuario.editar', N'Generales - Usuarios', N'Acceso de Usuarios', N'Editar', N'')
, (N'generales.perfil.acceder', N'Generales - Perfil', N'Acceso de Perfil', N'Acceder', N'')
, (N'generales.perfil.crear', N'Generales - Perfil', N'Acceso de Perfil', N'Crear', N'')
, (N'generales.perfil.editar', N'Generales - Perfil', N'Acceso de Perfil', N'Editar', N'')
, (N'generales.pais.acceder', N'Generales - País', N'Acceso de País', N'Acceder', N'')
, (N'generales.pais.crear', N'Generales - País', N'Acceso de País', N'Crear', N'')
, (N'generales.pais.editar', N'Generales - País', N'Acceso de País', N'Editar', N'')
, (N'generales.provincia.acceder', N'Generales - Provincia', N'Acceso de Provincia', N'Acceder', N'')
, (N'generales.provincia.crear', N'Generales - Provincia', N'Acceso de Provincia', N'Crear', N'')
, (N'generales.provincia.editar', N'Generales - Provincia', N'Acceso de Provincia', N'Editar', N'')
, (N'generales.ciudad.acceder', N'Generales - Ciudad', N'Acceso de Ciudad', N'Acceder', N'')
, (N'generales.ciudad.crear', N'Generales - Ciudad', N'Acceso de Ciudad', N'Crear', N'')
, (N'generales.ciudad.editar', N'Generales - Ciudad', N'Acceso de Ciudad', N'Editar', N'')


) 
AS Source (Id,Modulo,Opcion,Permiso,Descripcion)
ON (Target.Id = Source.Id)

WHEN MATCHED AND (
    NULLIF(Source.Modulo, Target.Modulo) IS NOT NULL 
 OR NULLIF(Target.Modulo, Source.Modulo) IS NOT NULL 
 OR NULLIF(Source.Opcion, Target.Opcion) IS NOT NULL 
 OR NULLIF(Target.Opcion, Source.Opcion) IS NOT NULL 
 OR NULLIF(Source.Permiso, Target.Permiso) IS NOT NULL 
 OR NULLIF(Target.Permiso, Source.Permiso) IS NOT NULL 
 OR	NULLIF(Source.Descripcion, Target.Descripcion) IS NOT NULL 
 OR NULLIF(Target.Descripcion, Source.Descripcion) IS NOT NULL
) 
THEN
  UPDATE SET 
  Target.Modulo = Source.Modulo,
  Target.Opcion = Source.Opcion,
  Target.Permiso = Source.Permiso,  
  Target.Descripcion = Source.Descripcion  
WHEN NOT MATCHED BY TARGET THEN
 INSERT(Id,Modulo,Opcion,Permiso,Descripcion)
 VALUES(Source.Id, Source.Modulo, Source.Opcion, Source.Permiso,Source.Descripcion)
WHEN NOT MATCHED BY SOURCE THEN 
 DELETE;

GO

SET NOCOUNT OFF
GO

PRINT'RegistraAcceso EJECUTANDO CON ÉXITO'