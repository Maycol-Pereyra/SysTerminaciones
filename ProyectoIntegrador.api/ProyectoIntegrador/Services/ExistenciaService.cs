using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.IServices;
using ProyectoIntegrador.Api.Models;
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
                .Where(o => o.Id == entidad.Id
                    || (string.IsNullOrWhiteSpace(entidad.Cedula) == false && o.Cedula == entidad.Cedula)
                    || (string.IsNullOrWhiteSpace(entidad.Rnc) == false && o.Rnc == entidad.Rnc)
                    || (string.IsNullOrWhiteSpace(entidad.Pasaporte) == false && o.Pasaporte == entidad.Pasaporte))
                .FirstOrDefaultAsync();

            if (existe != null)
            {
                entidad.Id = existe.Id;
            }

            return existe != null;
        }

        public async Task<int> RegistraActualizaEntidad(EntidadVm entidad)
        {
            if (entidad == null || await Existe(entidad) == false)
            {
                var obj = _mapper.Map<Entidad>(entidad);

                obj.EstaActivo = true;
                obj.FechaCreacion = DateTime.Now;

                _dbContext.Entidad.Add(obj);
                await _dbContext.SaveChangesAsync();

                return obj.Id;
            }

            var savedObj = await _dbContext.Entidad
                .Where(o => o.Id == entidad.Id)
                .FirstOrDefaultAsync();

            _mapper.Map(entidad, savedObj);

            _dbContext.Entidad.Update(savedObj);
            await _dbContext.SaveChangesAsync();

            return savedObj.Id;
        }


        public async Task<List<EntidadVm>> ObtenerSimilares(EntidadVm entidad)
        {
            if (entidad == null) { return new List<EntidadVm>(); }

            var entidades = await _dbContext.Entidad
                .AsNoTracking()
                .Where(o => o.Cedula == entidad.Cedula || o.Rnc == entidad.Rnc || o.Pasaporte == entidad.Pasaporte)
                .ToListAsync();

            var entidadesVm = _mapper.Map<List<EntidadVm>>(entidades);

            return entidadesVm;
        }
    }
}
