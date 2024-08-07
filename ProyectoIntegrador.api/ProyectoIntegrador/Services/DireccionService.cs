using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;
using ProyectoIntegrador.IServices;

namespace ProyectoIntegrador.Api.Services
{
    public class DireccionService : IDireccionService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public DireccionService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<int> ObtenerDireccionId(DireccionVm vm)
        {
            var direccion = await _dbContext.Direccion
                .Where(o => o.PaisId == vm.PaisId)
                .Where(o => o.ProvinciaId == vm.ProvinciaId)
                .Where(o => o.CiudadId == vm.CiudadId)
                .Where(o => o.SectorId == vm.SectorId)
                .Where(o => o.Calle == vm.Calle)
                .Where(o => o.Casa == vm.Casa)
                .Where(o => o.Referencia == vm.Referencia)
                .AsNoTracking()
                .FirstOrDefaultAsync();

            if (direccion != null)
            {
                return direccion.Id;
            }

            var obj = _mapper.Map<Direccion>(vm);

            _dbContext.Direccion.Add(obj);

            await _dbContext.SaveChangesAsync();

            return obj.Id;
        }
    }
}
