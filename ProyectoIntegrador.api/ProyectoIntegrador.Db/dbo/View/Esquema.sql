﻿--CREATE VIEW [dbo].[EsquemaView]
--AS

--SELECT
--    table_name AS Tabla,
--    ordinal_position AS Posicion,
--    data_type AS Tipo,
--    column_name AS Campo,
--    column_default AS ValorPredeterminado,
--    Cast(CASE is_nullable WHEN 'YES' THEN 1 ELSE 0 END AS BIT) AS ValorNulo,
--    character_maximum_length AS LongitudMaximaCaracteres
--FROM information_schema.columns
--WHERE
--    table_schema = 'dbo'