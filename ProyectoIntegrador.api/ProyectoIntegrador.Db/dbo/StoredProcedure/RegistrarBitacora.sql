---- TODO ROBINSON
--CREATE PROCEDURE [dbo].[RegistrarBitacora]
--    AS
--    BEGIN

--    DECLARE
--        @id_disparador INT = OBJECT_ID(@@PROCID),
--        @nombre_tabla NVARCHAR(128) = OBJECT_ID(@@PROCID),
--        @columnas VARBINARY(256) = COLUMNS_UPDATED(),
--        @posicion_columna INT = 1,
--        @nombre_columna NVARCHAR(128);

--    SELECT @nombre_tabla = t.name
--    FROM [sys].[triggers] d
--    JOIN [sys].[tables] t ON d.parent_id = t.object_id
--    WHERE d.object_id = OBJECT_ID(@@PROCID);

--    WHILE @posicion_columna <= (
--        SELECT COUNT(*)
--        FROM INFORMATION_SCHEMA.COLUMNS
--        WHERE TABLE_NAME = @nombre_tabla
--    ) BEGIN

--        PRINT CONCAT(

--        );

--        IF SUBSTRING(@columnas, (@posicion_columna - 1) / 8 + 1, 1) & POWER(2, (@posicion_columna - 1) % 8) > 0
--        BEGIN

--            SET @nombre_columna = (
--                SELECT COLUMN_NAME
--                FROM INFORMATION_SCHEMA.COLUMNS
--                WHERE TABLE_NAME = @nombre_tabla
--                    AND ORDINAL_POSITION = @posicion_columna
--            );

--            PRINT CONCAT(
--                'Posición: ', @posicion_columna, CHAR(10),
--                'Nombre de la columna: ', @nombre_columna
--            );

--        END

--        SET @posicion_columna = @posicion_columna + 1;

--        PRINT CONCAT(
--            'ID del disparador: ', @id_disparador, CHAR(10),
--            'Tabla: ' + @nombre_tabla, CHAR(10),
--            'Mix #1: ', SUBSTRING(@columnas, (@posicion_columna - 1) / 8 + 1, 1), CHAR(10),
--            'Mix #2: ', POWER(2, (@posicion_columna - 1) % 8), CHAR(10),
--            'Posición: ', @posicion_columna - 1, CHAR(10),
--            'Nombre de la columna: ', @nombre_columna
--        );

--    END

--END 
