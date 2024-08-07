namespace ProyectoIntegrador.Api._Core.Entidades
{
    public abstract class RequestParameter
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 250;
        public string OrderBy { get; set; } = "";
        public string Criterio { get; set; } = "";

        public virtual Dictionary<string, string> ToDictionary()
        {
            var list = new Dictionary<string, string>
            {
                { "PageNumber", $"{PageNumber}" },
                { "PageSize", $"{PageSize}" },
                { "OrderBy", $"{OrderBy}" },
                { "Criterio", $"{Criterio}" }
            };

            return list;
        }
    }
}
