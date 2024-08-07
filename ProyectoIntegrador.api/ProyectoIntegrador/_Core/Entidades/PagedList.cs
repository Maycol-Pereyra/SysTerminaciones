namespace ProyectoIntegrador.Api._Core.Entidades
{
    public class PagedList<T>
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }

        public PagedList(List<T> items, int totalCount, int pageNumber, int pageSize)
        {
            Items = items;
            TotalCount = totalCount;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        public PagedList<T1> GetCopy<T1>(List<T1> items)
        {
            return new PagedList<T1>(items, TotalCount, PageNumber, PageSize);
        }
    }
}
