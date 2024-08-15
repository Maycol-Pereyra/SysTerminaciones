using AutoMapper;
using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api._Core.Extensions;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.Api.ViewModel;
using ProyectoIntegrador.Data;
using ProyectoIntegrador.IServices;

namespace ProyectoIntegrador.Services
{
    public class RegistraTomaMedidaService : IRegistraTomaMedidaService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public RegistraTomaMedidaService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<List<int>> Registra(List<TomaMedidaVm> listaVm)
        {
            if (listaVm.SinElementos()) { return new(); }

            var listaId = new List<int>();

            var lista = _mapper.Map<List<TomaMedida>>(listaVm);

            foreach (var item in lista)
            {
                if (item.Id > 0)
                {
                    var objUpdate = await _dbContext.TomaMedida
                        .FirstOrDefaultAsync(o => o.Id == item.Id);

                    if (objUpdate != null)
                    {
                        _dbContext.TomaMedida.Update(objUpdate);
                        await _dbContext.SaveChangesAsync();
                    }
                }
                else
                {
                    _dbContext.TomaMedida.Add(item);
                    await _dbContext.SaveChangesAsync();
                }

                listaId.Add(item.Id);
            }

            return listaId;
        }
    }
}
