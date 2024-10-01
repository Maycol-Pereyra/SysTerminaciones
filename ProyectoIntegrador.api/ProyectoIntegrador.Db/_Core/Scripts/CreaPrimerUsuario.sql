PRINT'EJECUTANDO CreaPrimerUsuario'

SET NOCOUNT ON

IF NOT EXISTS (SELECT TOP 1 * FROM Entidad) BEGIN
    INSERT INTO Entidad (Nombre, Apellido, Cedula, Rnc, Pasaporte, Correo, FechaCreacion, EstaActivo)
    VALUES ('Usuario', 'Admin', '402-1173206-6', '', '', 'admin@systerminaciones.com', GETDATE(), 1)
END

DECLARE @EntidadId INT
SET @EntidadId = 0

SELECT TOP 1 @EntidadId = Id FROM Entidad WHERE Nombre = 'Usuario' ORDER BY Id

IF (NOT EXISTS (SELECT TOP 1 * FROM Empleado)) AND @EntidadId > 0 BEGIN
    INSERT INTO Empleado (EntidadId, Sueldo, PosicionId, DepartamentoId, FechaIngreso, FechaTerminoContrato, FechaCreacion, EstaActivo)
    VALUES (@EntidadId, 120000, null, null, GETDATE(), null, GETDATE(), 1)
END

DECLARE @EmpleadoId INT
SET @EmpleadoId = 0

SELECT TOP 1 @EmpleadoId = Id FROM Empleado WHERE EntidadId = @EntidadId ORDER BY Id

IF (NOT EXISTS (SELECT TOP 1 * FROM Usuario)) AND @EmpleadoId > 0 BEGIN
    INSERT INTO Usuario (EmpleadoId, Login, PasswordHash, PasswordSalt, FechaModificacion, FechaCreacion, EstaActivo)
    VALUES (@EmpleadoId, 'admin', 0x9D5F6428DDA0F57588E3FD1F937BC5F764DC6E19BA77E6D441CE470A14B4CAEA86A3BC4DBAF1EF5120CC0E3DC443059943F884882D13F31618F412D413709ED4, 0xB442D86BAE8E440C17C8D330ECCE3B3F0333363A77FA211F1C2D932A54EA55ABB73DE2322D640C0F86DEE06905E5C143630DEAB41DF36C60D5EDD22234AEE4E759A76BB61B7A3C1295294B812E4BA08BAD21C93715FA7EA0B3F4A814CCB84AF1080ADA5340CAA0B77198DAC60117E638763BE28A058FE77F94064EF9D77E727B, GETDATE(), GETDATE(), 1)
END

IF (NOT EXISTS (SELECT TOP 1 * FROM Perfil)) BEGIN
    INSERT INTO Perfil (Descripcion, FechaCreacion, EstaActivo) VALUES ('Admin', GETDATE(), 1)
END

DECLARE @PerfilId INT
SET @PerfilId = 0

SELECT TOP 1 @PerfilId = Id FROM Perfil ORDER BY Id

IF (NOT EXISTS (SELECT TOP 1 * FROM PerfilAcceso)) BEGIN
    INSERT INTO PerfilAcceso(PerfilId, AccesoId)
    SELECT @PerfilId, p.Id
    FROM Acceso p;
END

DECLARE @UsuarioId INT
SET @UsuarioId = 0

SELECT TOP 1 @UsuarioId = Id FROM Usuario ORDER BY Id

IF (NOT EXISTS (SELECT TOP 1 * FROM UsuarioPerfil)) BEGIN
    INSERT INTO UsuarioPerfil (UsuarioId, PerfilId) VALUES (@UsuarioId, @PerfilId)
END


PRINT'CreaPrimerUsuario EJECUTADO CON ÉXITO'