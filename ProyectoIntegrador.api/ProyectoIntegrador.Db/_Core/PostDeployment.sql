PRINT'EJUCUTANDO SCRIPT PostDeployment'

:on error exit

:r Scripts\RegistraTipoDefecto.sql
:r Scripts\RegistraTipoRegistro.sql
:r Scripts\RegistraTipoProducto.sql
:r Scripts\RegistraDefecto.sql
:r Scripts\RegistraAcceso.sql
:r Scripts\CreaPrimerUsuario.sql

PRINT'PostDeployment EJECUTADO CON ÉXITO'