using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.IServices;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;

namespace ProyectoIntegrador.Api.Services
{
    public class ExistenciaService : IExistenciaService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ExistenciaService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<bool> Existe(EntidadVm entidad)
        {
            if (entidad == null) { return false; }

            var existe = await _dbContext.Entidad
                .AsNoTracking()
                .Where(o => o.TipoIdentificacionId == entidad.TipoIdentificacionId && o.Identificacion == entidad.Identificacion
                    || (o.Nombre == entidad.Nombre && o.Apellido == entidad.Apellido))
                .AnyAsync();

            return existe;
        }

        public async Task<List<EntidadVm>> ObtenerSimilares(EntidadVm entidad)
        {
            if (entidad == null) { return new List<EntidadVm>(); }

            var entidades = await _dbContext.Entidad
                .AsNoTracking()
                .Where(o => o.TipoIdentificacionId == entidad.TipoIdentificacionId && o.Identificacion == entidad.Identificacion
                    || (o.Nombre == entidad.Nombre && o.Apellido == entidad.Apellido))
                .ToListAsync();

            var entidadesVm = _mapper.Map<List<EntidadVm>>(entidades);

            return entidadesVm;
        }
    }
}
