using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;

namespace ProyectoIntegrador.Api._Core.Entidades
{
    public class Resultado
    {
        public static readonly int NotFound = 404;
        public object Value { get; set; }
        public int Error { get; set; }

        public bool EsValido
        {
            get
            {
                if (Lista == null)
                {
                    return true;
                }

                return Lista.Count() == 0;
            }
        }

        public bool EsInvalido
        {
            get { return !EsValido; }
        }

        public List<ValidacionResultado> Lista { get; private set; }

        public string PrimerMensaje
        {
            get
            {
                if (Lista?.Any() ?? false)
                {
                    return Lista.FirstOrDefault().Mensaje;
                }

                return "";
            }
        }
        public Resultado()
        {
            Lista = new List<ValidacionResultado>();
        }

        public Resultado(string mensaje) : this()
        {
            Agregar(mensaje);
        }

        public Resultado(string mensaje, int error) : this(mensaje)
        {
            this.Error = error;
        }

        public Resultado Agregar(Resultado resultado)
        {
            if (resultado != null)
            {
                Lista.AddRange(resultado.Lista);
            }

            return this;
        }

        public Resultado Agregar(ValidacionResultado validacion)
        {
            Lista.Add(validacion);
            return this;
        }

        public Resultado Agregar(IEnumerable<ValidacionResultado> validaciones)
        {
            Lista.AddRange(validaciones);
            return this;
        }

        public Resultado Agregar(string mensaje)
        {
            Lista.Add(new ValidacionResultado(mensaje));
            return this;
        }

        public Resultado Agregar(string mensaje, string campo)
        {
            Lista.Add(new ValidacionResultado(mensaje, campo));
            return this;
        }

        public Resultado Agregar(string mensaje, IEnumerable<string> campos)
        {
            Lista.Add(new ValidacionResultado(mensaje, campos));
            return this;
        }

        public static Resultado Ok()
        {
            return new Resultado();
        }

        public static Resultado Ok(object value)
        {
            return new Resultado
            {
                Value = value
            };
        }

        public static Resultado Invalido(string mensaje)
        {
            return new Resultado().Agregar(mensaje);
        }

        public static Resultado Invalido(string mensaje, string campo)
        {
            return new Resultado().Agregar(mensaje, campo);
        }
    }
}
