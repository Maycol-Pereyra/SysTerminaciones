using System.Text;

namespace ProyectoIntegrador.Api._Core.Helper
{
    public class PasswordHelper
    {
        public static string GeneraNuevoPassword()
        {
            string opciones = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            int tope = opciones.Length;

            var sb = new StringBuilder();
            for (int i = 0; i < 10; i++)
            {
                var r = new Random();
                int index = r.Next(0, tope);
                sb.Append(opciones[index]);
            }

            return sb.ToString();
        }

        public static string GeneraNuevoPassword3Ly7N()
        {
            string opciones1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string opciones2 = "0123456789";

            int tope = opciones1.Length;
            var sb = new StringBuilder();
            for (int i = 0; i < 3; i++)
            {
                var r = new Random();
                int index = r.Next(0, tope);
                sb.Append(opciones1[index]);
            }

            tope = opciones2.Length;
            for (int i = 0; i < 7; i++)
            {
                var r = new Random();
                int index = r.Next(0, tope);
                sb.Append(opciones2[index]);
            }

            return sb.ToString();
        }

        public static string GeneraCodigoSeguridad()
        {
            string opciones = "1234567890";
            int tope = opciones.Length;

            var sb = new StringBuilder();
            for (int i = 0; i < 6; i++)
            {
                var r = new Random();
                int index = r.Next(0, tope);
                sb.Append(opciones[index]);
            }

            return sb.ToString();
        }

        public static string GeneraOTPSecret()
        {
            // ESTOS SON LOS CARACTERES PERMITIDOS PARA SER BASE 32
            string opciones = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

            int tope = opciones.Length;

            var sb = new StringBuilder();
            for (int i = 0; i < 32; i++)
            {
                var r = new Random();
                int index = r.Next(0, tope);
                sb.Append(opciones[index]);
            }

            return sb.ToString();
        }
    }
}
