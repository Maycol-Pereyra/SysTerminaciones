namespace ProyectoIntegrador.Api._Core.Entidades
{
    public class Message<T>
    {
        public bool EsValido
        {
            get
            {
                return string.IsNullOrWhiteSpace(Mensaje);
            }
        }

        public bool EsInvalido
        {
            get { return !EsValido; }
        }

        public string Mensaje { get; set; } = "";

        public T Data { get; set; }

        public Message()
        {

        }

        public Message(string mensaje)
        {
            Mensaje = mensaje;
        }

        public static Message<T> Ok()
        {
            return new Message<T>();
        }

        public static Message<T> Ok(T value)
        {
            return new Message<T> { Data = value };
        }

        public static Message<T> Invalido(string mensaje)
        {
            return new Message<T> { Mensaje = mensaje };
        }

        public static Message<T> Validacion(string mensaje)
        {
            return new Message<T>(mensaje);
        }

        public static Message<T> Validacion(string msg, T data)
        {
            return new Message<T>
            {
                Mensaje = msg,
                Data = data
            };
        }
    }
}
