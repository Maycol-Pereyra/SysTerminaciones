CREATE TABLE [dbo].[RolPermiso] (
	[PerfilId] INT NOT NULL,
	[PermisoId] INT NOT NULL,
	PRIMARY KEY (PerfilId, PermisoId),
	FOREIGN KEY (PerfilId) REFERENCES Perfil(Id),
	FOREIGN KEY (PermisoId) REFERENCES Permiso(Id)
)
