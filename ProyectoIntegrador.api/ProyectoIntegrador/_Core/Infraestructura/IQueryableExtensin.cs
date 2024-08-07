//using Microsoft.EntityFrameworkCore;

//namespace ProyectoIntegrador.Api._Core.Infraestructura
//{
//    public static class IQueryableExtensin
//    {
//        public static async Task<PagedList<T>> ToPagedList<T>(this IQueryable<T> lista, RequestParameter parameters)
//        {
//            int total = await lista.CountAsync();

//            // SI EL SIZE ES CERO ASUMIR QUE NO HAY PAGINACION.
//            if (parameters.PageSize > 0)
//            {
//                int pageSize = parameters.PageSize;
//                int cantidadSkip = (parameters.PageNumber - 1) * pageSize;

//                // SI ES MAYOR QUE EL TOTAL ENTONCES LA PAGINA ESTA FUERA DE RANGO, RETORNAR NULL
//                if (cantidadSkip >= total)
//                {
//                    pageSize = 0;
//                    cantidadSkip = 0;
//                    // return null;
//                }

//                if (pageSize > total)
//                {
//                    pageSize = total;
//                }

//                lista = cantidadSkip > 0 ?
//                    lista.Skip(cantidadSkip).Take(pageSize) :
//                    lista.Take(pageSize);
//            }

//            return new PagedList<T>(await lista.ToListAsync(), total, parameters.PageNumber, parameters.PageSize);
//        }

//        public static async Task<PagedList<T>> ToPagedList<T>(this IQueryable<T> lista, int pageSize, int pageNumber)
//        {
//            int total = await lista.CountAsync();

//            // SI EL SIZE ES CERO ASUMIR QUE NO HAY PAGINACION.
//            if (pageSize > 0)
//            {
//                int cantidadSkip = (pageNumber - 1) * pageSize;

//                // SI ES MAYOR QUE EL TOTAL ENTONCES LA PAGINA ESTA FUERA DE RANGO, RETORNAR NULL
//                if (cantidadSkip >= total)
//                {
//                    pageSize = 0;
//                    cantidadSkip = 0;
//                }

//                if (pageSize > total)
//                {
//                    pageSize = total;
//                }

//                lista = cantidadSkip > 0 ?
//                    lista.Skip(cantidadSkip).Take(pageSize) :
//                    lista.Take(pageSize);
//            }

//            return new PagedList<T>(await lista.ToListAsync(), total, pageNumber, pageSize);
//        }

//        public static IQueryable<T> Paginacion<T>(this IQueryable<T> lista, int pagina, int cantidad, int total)
//        {
//            if (cantidad == 0)
//            {
//                return lista;
//            }

//            int cantidadSkip = (pagina - 1) * cantidad;

//            if (cantidadSkip >= total)
//            {
//                cantidadSkip = 0;
//            }

//            if (cantidad > total)
//            {
//                cantidad = total;
//            }

//            if (cantidadSkip > 0)
//            {
//                return lista
//                .Skip(cantidadSkip)
//                .Take(cantidad);
//            }
//            else
//            {
//                return lista
//                .Take(cantidad);
//            }
//        }

//        public static IQueryable<T> PaginacionSelect<T>(this IQueryable<T> lista, int desde, int hasta)
//        {
//            int cantidad = hasta - desde + 1;
//            if (cantidad == 0)
//            {
//                return lista;
//            }

//            int cantidadSkip = (desde - 1);

//            return lista
//                .Skip(cantidadSkip)
//                .Take(cantidad);
//        }
//    }
//}
