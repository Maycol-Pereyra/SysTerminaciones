namespace ProyectoIntegrador.Models
{
    public class Esquema
    {
        public string Tabla { get; set; } = "";
        public int? Posicion { get; set; }
        public string Tipo { get; set; } = "";
        public string Campo { get; set; } = "";
        public string ValorPredeterminado { get; set; } = "";
        public bool? ValorNulo { get; set; }
        public int? LongitudMaximaCaracteres { get; set; }
    }
}
