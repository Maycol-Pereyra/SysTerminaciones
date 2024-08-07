namespace ProyectoIntegrador.Api._Core.Infraestructura
{
    public class AppSettings
    {
        public string JwtSecret { get; set; } = "";
        public string JwtIssuer { get; set; } = "";
        public string JwtAudience { get; set; } = "";
    }
}
