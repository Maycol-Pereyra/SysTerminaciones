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
            throw new NotImplementedException();
        }
    }
}
