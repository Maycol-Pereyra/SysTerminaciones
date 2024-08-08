CREATE TABLE [dbo].[Acceso]
(
    [Id] VARCHAR(250) PRIMARY KEY,
    [Modulo] VARCHAR(100) NOT NULL,
    [Opcion] VARCHAR(100) NOT NULL,
    [Permiso] VARCHAR(50) NOT NULL,
    [Descripcion] VARCHAR(250) NOT NULL    
)
