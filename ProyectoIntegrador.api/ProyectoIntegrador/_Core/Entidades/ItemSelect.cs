namespace ProyectoIntegrador.Api._Core.Entidades
{
    public sealed class ItemSelect
    {
        public int Id { get; set; } = 0;
        public string Descripcion { get; set; } = "";
        public bool EstaActivo { get; set; } = true;
        public object Objeto { get; set; } = new();
    }
}
