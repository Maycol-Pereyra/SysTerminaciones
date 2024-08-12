using AutoMapper;
using ProyectoIntegrador.Api.IServices;
using ProyectoIntegrador.Api.Services;
using ProyectoIntegrador.IServices;
using ProyectoIntegrador.Mappers;
using ProyectoIntegrador.Services;

namespace ProyectoIntegrador.Api
{
    public static class ServiceExtension
    {
        public static IMapperConfigurationExpression AddMappers(this IMapperConfigurationExpression mc)
        {
            mc.AddProfile(new AlmacenMapper());
            mc.AddProfile(new AperturaCajaMapper());
            mc.AddProfile(new BitacoraMapper());
            mc.AddProfile(new CajaMapper());
            mc.AddProfile(new CargamentoVehiculoMapper());
            mc.AddProfile(new CiudadMapper());
            mc.AddProfile(new ClasificacionContableMapper());
            mc.AddProfile(new ClienteMapper());
            mc.AddProfile(new CompraMapper());
            mc.AddProfile(new ConduceMapper());
            mc.AddProfile(new ConceptoMapper());
            mc.AddProfile(new CotizacionMapper());
            mc.AddProfile(new CuentaContableMapper());
            mc.AddProfile(new CuadreCajaMapper());
            mc.AddProfile(new DesgloseCorrederaMapper());
            mc.AddProfile(new DesgloseEfectivoAsignadoCajaMapper());
            mc.AddProfile(new DespachoMapper());
            mc.AddProfile(new DistribucionEnvioMapper());
            mc.AddProfile(new EmpleadoMapper());
            mc.AddProfile(new EnsambladoMapper());
            mc.AddProfile(new EntidadMapper());
            mc.AddProfile(new EnvioMapper());
            mc.AddProfile(new EsquemaMapper());
            mc.AddProfile(new FacturaMapper());
            mc.AddProfile(new HerramientaMapper());
            mc.AddProfile(new InventarioMapper());
            mc.AddProfile(new RegistroMapper());
            mc.AddProfile(new RectificarMedidaMapper());
            mc.AddProfile(new RectificarMedidaDetalleMapper());
            mc.AddProfile(new RolMapper());
            mc.AddProfile(new NominaMapper());
            mc.AddProfile(new PaisMapper());
            mc.AddProfile(new PerfilMapper());
            mc.AddProfile(new PermisoMapper());
            mc.AddProfile(new ProductoMapper());
            mc.AddProfile(new ProgramaMapper());
            mc.AddProfile(new ProvinciaMapper());
            mc.AddProfile(new SectorMapper());
            mc.AddProfile(new SolicitudTomaMedidaMapper());
            mc.AddProfile(new SuplidorMapper());
            mc.AddProfile(new TipoRegistroMapper());
            mc.AddProfile(new TipoProductoMapper());
            mc.AddProfile(new TomaMedidaMapper());
            mc.AddProfile(new UnidadMapper());
            mc.AddProfile(new UsuarioMapper());
            mc.AddProfile(new UsuarioRolMapper());
            mc.AddProfile(new VehiculoMapper());
            return mc;
        }

        public static IServiceCollection InyectaServicios(this IServiceCollection services)
        {
            services.AddScoped<IExistenciaService, ExistenciaService>();
            services.AddScoped<IDireccionService, DireccionService>();
            services.AddScoped<IRegistraTomaMedidaService, RegistraTomaMedidaService>();
            return services;
        }

        public static void InicialiarMapper(this IServiceCollection services)
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddMappers();
            });

            IMapper mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);
        }

        public static IServiceCollection AddLocalServices(this IServiceCollection services)
        {
            services.InyectaServicios();
            return services;
        }

    }
}
