namespace ProyectoIntegrador.Api._Core.Extensions
{
    public static class ListaExtension
    {
        public static bool SinElementos<T>(this List<T> lista)
        {
            if (lista == null || lista.Any() == false)
            {
                return true;
            }

            return false;
        }

        public static bool ContieneElementos<T>(this List<T> lista)
        {
            if (lista == null || lista.Any() == false)
            {
                return false;
            }

            return true;
        }

        public static bool SinElementos<T>(this IEnumerable<T> lista)
        {
            if (lista == null || lista.Any() == false)
            {
                return true;
            }

            return false;
        }

        public static bool ContieneElementos<T>(this IEnumerable<T> lista)
        {
            if (lista == null || lista.Any() == false)
            {
                return false;
            }

            return true;
        }
    }
}
