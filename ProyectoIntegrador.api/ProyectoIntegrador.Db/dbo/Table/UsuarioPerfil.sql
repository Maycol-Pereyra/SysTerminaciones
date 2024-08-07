CREATE TABLE [dbo].[UsuarioPerfil] (
	[UsuarioId] INT NOT NULL,
	[PerfilId] INT NOT NULL,
	[FechaCreacion] DATETIME NOT NULL DEFAULT GETDATE(),
	PRIMARY KEY (UsuarioId, PerfilId),
	FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id),
	FOREIGN KEY (PerfilId) REFERENCES Perfil(Id)
)
