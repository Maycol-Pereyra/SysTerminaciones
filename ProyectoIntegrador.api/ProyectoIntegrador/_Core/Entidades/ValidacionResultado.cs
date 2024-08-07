namespace ProyectoIntegrador.Api._Core.Entidades
{
    public class ValidacionResultado
    {
        public string Mensaje { get; set; }
        public IEnumerable<string> Campos { get; }

        public bool EsValido
        {
            get
            {
                return Mensaje.Length == 0;
            }
        }

        public ValidacionResultado() : this("", "")
        {

        }

        public ValidacionResultado(string mensaje) : this(mensaje, "")
        {

        }

        public ValidacionResultado(string mensaje, string campo) : this(mensaje, new List<string>() { campo })
        {

        }

        public ValidacionResultado(string mensaje, IEnumerable<string> campos)
        {
            Mensaje = mensaje;
            Campos = campos;
        }
    }
}
