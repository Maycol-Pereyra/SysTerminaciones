PRINT'EJUCUTANDO SCRIPT PostDeployment'

:on error exit

:r Scripts\RegistraTipoRegistro.sql
:r Scripts\RegistraTipoProducto.sql
:r Scripts\RegistraDatosBaseTablaRegistro.sql
:r Scripts\RegistraPrograma.sql
:r Scripts\RegistraAcceso.sql
:r Scripts\CreaPrimerUsuario.sql

PRINT'PostDeployment EJECUTADO CON ÉXITO'