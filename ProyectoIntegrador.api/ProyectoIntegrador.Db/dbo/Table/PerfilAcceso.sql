CREATE TABLE [dbo].[PerfilAcceso] (
	[PerfilId] INT NOT NULL,
	[AccesoId] VARCHAR(250) NOT NULL,
	PRIMARY KEY (PerfilId, AccesoId),
	FOREIGN KEY (PerfilId) REFERENCES Perfil(Id),
	FOREIGN KEY (AccesoId) REFERENCES Acceso(Id)
)
