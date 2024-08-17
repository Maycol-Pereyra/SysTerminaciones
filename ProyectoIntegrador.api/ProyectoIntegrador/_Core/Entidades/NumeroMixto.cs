namespace ProyectoIntegrador._Core.Entidades
{
    public class NumeroMixto
    {
        public string NumeroString { get; private set; } = "";
        public decimal NumeroDecimal { get; private set; }
        public int NumeroEntero { get; private set; }
        public int Numerador { get; private set; }
        public int Denominador { get; private set; }

        // Constructor que acepta un número mixto en formato string o un número decimal/entero
        public NumeroMixto(string numeroMixto)
        {
            // Asumimos el formato "Entero Numerador/Denominador" o solo "Entero"
            var partes = numeroMixto.Split(' ');
            if (partes.Length == 2)
            {
                var entero = int.Parse(partes[0]);
                var fraccion = partes[1].Split('/');
                var numerador = int.Parse(fraccion[0]);
                var denominador = int.Parse(fraccion[1]);

                Inicializar(entero, numerador, denominador);
            }
            else if (partes.Length == 1)
            {
                // Si es solo un número entero
                var entero = int.Parse(partes[0]);
                Inicializar(entero, 0, 1); // No hay fracción, denominador es 1
            }
            else
            {
                throw new ArgumentException("Formato de número mixto inválido");
            }
        }

        // Constructor que acepta un número decimal o entero
        public NumeroMixto(decimal numeroDecimal)
        {
            var entero = (int)Math.Floor(numeroDecimal);
            var fraccionDecimal = numeroDecimal - entero;

            if (fraccionDecimal == 0)
            {
                // Si es un número entero puro
                Inicializar(entero, 0, 1); // No hay fracción, denominador es 1
            }
            else
            {
                // Supongamos que usamos un denominador máximo de 1000 para la fracción
                const int maxDenominador = 1000;
                var denominador = maxDenominador;
                var numerador = (int)Math.Round(fraccionDecimal * denominador);

                // Simplificar la fracción
                var gcd = ObtenerMaximoComunDivisor(numerador, denominador);
                numerador /= gcd;
                denominador /= gcd;

                Inicializar(entero, numerador, denominador);
            }
        }

        private void Inicializar(int entero, int numerador, int denominador)
        {
            NumeroEntero = entero;
            Numerador = numerador;
            Denominador = denominador;
            NumeroDecimal = entero + (denominador != 0 ? (decimal)numerador / denominador : 0);
            NumeroString = numerador != 0 ? $"{entero} {numerador}/{denominador}" : $"{entero}";
        }

        private static int ObtenerMaximoComunDivisor(int a, int b)
        {
            while (b != 0)
            {
                var temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }
    }
}
