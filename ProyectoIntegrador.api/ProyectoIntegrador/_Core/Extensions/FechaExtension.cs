namespace ProyectoIntegrador.Api._Core.Extensions
{
    public static class FechaExtension
    {
        public static DateTime PrimerDia(this DateTime fecha)
        {
            return new DateTime(fecha.Year, fecha.Month, 1);
        }

        public static DateTime ObtenerUltimoDia(this DateTime fecha)
        {
            return new DateTime(fecha.Year, fecha.Month, DateTime.DaysInMonth(fecha.Year, fecha.Month));
        }

        public static DateTime AhoraZoneMenos4(this DateTime fecha)
        {
            var ahora = DateTime.UtcNow.AddHours(-4);
            return ahora;
        }

        public static DateTime HoyZoneMenos4(this DateTime fecha)
        {
            var hoy = DateTime.UtcNow.AddHours(-4);
            return hoy.Date;
        }

        public static (int? ano, int? mes) TiempoEnMesAno(this DateTime? fechaEvaluar, DateTime? fechaHasta = null)
        {
            if (fechaEvaluar == null) { return (null, null); }

            if (fechaHasta == null)
            {
                fechaHasta = DateTime.Now.HoyZoneMenos4();
            }

            int ano = 1;

            while (fechaEvaluar.GetValueOrDefault().AddYears(ano) <= fechaHasta)
            {
                ano++;
            }

            ano--;

            var fecha = fechaEvaluar.GetValueOrDefault().AddYears(ano);

            int mes = 1;
            while (fecha.AddMonths(mes) <= fechaHasta)
            {
                mes++;
            }

            mes--;

            return (ano, mes);
        }

        public static DateTimeOffset FechaEnOffsetMenos4(this DateTime fecha)
        {
            return new DateTimeOffset(fecha.Year, fecha.Month, fecha.Day, 0, 0, 0, new TimeSpan(-4, 0, 0));
        }

        public static DateTimeOffset FechaEnOffsetMenos4ConHora(this DateTimeOffset fecha)
        {
            return new DateTimeOffset(fecha.Year, fecha.Month, fecha.Day, fecha.Hour, fecha.Minute, fecha.Second, new TimeSpan(-4, 0, 0));
        }

        public static DateTime ZoneMenos4(this DateTime fecha)
        {
            return DateTime.UtcNow.AddHours(-4);
        }

        public static string ObtenerNombreMes(this DateTime fecha)
        {
            var month = fecha.Month;

            return month switch
            {
                1 => "Enero",
                2 => "Febrero",
                3 => "Marzo",
                4 => "Abril",
                5 => "Mayo",
                6 => "Junio",
                7 => "Julio",
                8 => "Agosto",
                9 => "Septiembre",
                10 => "Octubre",
                11 => "Noviembre",
                12 => "Diciembre",
                _ => "",
            };
        }
    }
}
