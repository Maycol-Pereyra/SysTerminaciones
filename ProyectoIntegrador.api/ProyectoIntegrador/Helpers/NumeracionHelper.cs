
namespace ProyectoIntegrador.Helpers
{
    public static class NumeracionHelper
    {
        public static string ObtenerNumeral(int id)
        {
            if (id == 0)
            {
                return "0000000000";
            }

            var numeral = id.ToString().PadLeft(10, '0');

            return numeral;
        }
    }
}
