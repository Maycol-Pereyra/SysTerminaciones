using System.Globalization;
using System.Text.RegularExpressions;
using System.Text;

namespace ProyectoIntegrador.Api._Core.Extensions
{
    public static class StringExtension
    {
        public static string QuitarCaracteres(this string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return text;
            }

            return text
                .Replace("-", "")
                .Replace("_", "")
                .Replace("/", "")
                .Replace("\\", "")
                .Replace(".", "")
                .Replace(",", "")
                .Replace("+", "")
                .Replace("(", "")
                .Replace(")", "")
                .Replace("[", "")
                .Replace("]", "")
                .Replace("*", "")
                .Replace("%", "")
                .Replace("#", "")
                .Replace("!", "")
                .Replace("$", "")
                .Replace("?", "")
                .Replace("¿", "");
        }

        public static string QuitarAcentos(this string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return "";
            }

            return Regex.Replace(text.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "");
        }


        public static string FormarNombreGuion(this string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                return "";
            }

            return text
                .QuitarCaracteres()
                .QuitarAcentos()
                .ToLower()
                .Replace(" ", "-");
        }

        public static string LengthTextoClean(this string texto, int lengt)
        {
            if (string.IsNullOrWhiteSpace(texto)) { return ""; }

            var value = texto.Trim().ReduceWhitespace();

            if (value.Length > lengt)
            {
                return value.Substring(0, lengt);
            }

            return value;
        }

        public static string ReduceWhitespace(this string value)
        {
            var newString = new StringBuilder();

            bool previousIsWhitespace = false;

            for (int i = 0; i < value.Length; i++)
            {
                if (char.IsWhiteSpace(value[i]))
                {
                    if (previousIsWhitespace)
                    {
                        continue;
                    }

                    previousIsWhitespace = true;
                }
                else
                {
                    previousIsWhitespace = false;
                }

                newString.Append(value[i]);
            }

            return newString.ToString();
        }

        public static string Fix(this string texto, int length)
        {
            return texto.Length > length
                ? texto.Substring(0, length)
                : texto;
        }

        public static string ToTitle(this string text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                return "";
            }

            CultureInfo cultureInfo = CultureInfo.CurrentCulture;
            TextInfo textInfo = cultureInfo.TextInfo;
            return textInfo.ToTitleCase(text.ToLower());
        }

        public static string SanearStringParaUrl(this string valor)
        {
            valor = valor
                .Replace(" ", "%20")
                .Replace("!", "%21")
                .Replace("\"", "%22")
                .Replace("#", "%23")
                .Replace("$", "%24")
                .Replace("%", "%25")
                .Replace("&", "%26")
                .Replace("'", "%27")
                .Replace("(", "%28")
                .Replace(")", "%29")
                .Replace("*", "%2A")
                .Replace("+", "%2B")
                .Replace(",", "%2C")
                .Replace("-", "%2D")
                .Replace(".", "%2E")
                .Replace("/", "%2F")

                .Replace(":", "%3A")
                .Replace(";", "%3B")
                .Replace("<", "%3C")
                .Replace("=", "%3D")
                .Replace(">", "%3E")
                .Replace("?", "%3F")

                .Replace("@", "%40")
                .Replace("[", "%5B")
                .Replace("\\", "%5C")
                .Replace("]", "%5D")
                .Replace("^", "%5E")
                .Replace("_", "%5F")

                .Replace("`", "%60")

                .Replace("{", "%7B")
                .Replace("|", "%7C")
                .Replace("}", "%7D")
                .Replace("~", "%7E")

                .Replace("ñ", "%F1")
                .Replace("Ñ", "%D1")
                ;

            return valor;
        }
    }
}
