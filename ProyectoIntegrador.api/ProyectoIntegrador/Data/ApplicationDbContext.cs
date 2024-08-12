using Microsoft.EntityFrameworkCore;
using ProyectoIntegrador.Api.Models;
using ProyectoIntegrador.DataModelConfig;
using ProyectoIntegrador.Models;

namespace ProyectoIntegrador.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
             
        }

        public DbSet<Almacen> Almacen { get; set; }
        public DbSet<AperturaCaja> AperturaCaja { get; set; }
        public DbSet<Bitacora> Bitacora { get; set; }
        public DbSet<Caja> Caja { get; set; }
        public DbSet<CargamentoVehiculo> CargamentoVehiculo { get; set; }
        public DbSet<Ciudad> Ciudad { get; set; }
        public DbSet<ClasificacionContable> ClasificacionContable { get; set; }
        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Compra> Compra { get; set; }
        public DbSet<CompraDetalle> CompraDetalle { get; set; }
        public DbSet<Concepto> Concepto { get; set; }
        public DbSet<ConduceDetalle> ConduceDetalle { get; set; }
        public DbSet<Conduce> Conduce { get; set; }
        public DbSet<CotizacionDetalle> CotizacionDetalle { get; set; }
        public DbSet<Cotizacion> Cotizacion { get; set; }
        public DbSet<CuadreCaja> CuadreCaja { get; set; }
        public DbSet<CuentaContable> CuentaContable { get; set; }
        public DbSet<DesgloseCorrederaDetalle> DesgloseCorrederaDetalle { get; set; }
        public DbSet<DesgloseCorredera> DesgloseCorredera { get; set; }
        public DbSet<DesgloseEfectivoAsignadoCaja> DesgloseEfectivoAsignadoCaja { get; set; }
        public DbSet<DespachoDetalle> DespachoDetalle { get; set; }
        public DbSet<Despacho> Despacho { get; set; }
        public DbSet<DistribucionEnvio> DistribucionEnvio { get; set; }
        public DbSet<DistribucionEnvioVehiculo> DistribucionEnvioVehiculo { get; set; }
        public DbSet<Empleado> Empleado { get; set; }
        public DbSet<EmpleadoHerramienta> EmpleadoHerramienta { get; set; }
        public DbSet<Ensamblado> Ensamblado { get; set; }
        public DbSet<EnsambladoDetalle> EnsambladoDetalle { get; set; }
        public DbSet<Entidad> Entidad { get; set; }
        public DbSet<EntidadDireccion> EntidadDireccion { get; set; }
        public DbSet<EntidadTelefono> EntidadTelefono { get; set; }
        public DbSet<Envio> Envio { get; set; }
        public DbSet<EnvioDetalle> EnvioDetalle { get; set; }
        public DbSet<Esquema> Esquema { get; set; }
        public DbSet<ErrorCuadreCaja> ErrorCuadreCaja { get; set; }
        public DbSet<Factura> Factura { get; set; }
        public DbSet<FacturaDetalle> FacturaDetalle { get; set; }
        public DbSet<Herramienta> Herramienta { get; set; }
        public DbSet<Inventario> Inventario { get; set; }
        public DbSet<InventarioProductoGastable> InventarioProductoGastable { get; set; }
        public DbSet<InventarioVenta> InventarioVenta { get; set; }
        public DbSet<MovimientoInventario> MovimientoInventario { get; set; }
        public DbSet<MovimientoPagoCaja> MovimientoPagoCaja { get; set; }
        public DbSet<Nomina> Nomina { get; set; }
        public DbSet<NominaDetalle> NominaDetalle { get; set; }
        public DbSet<Pais> Pais { get; set; }
        public DbSet<Perfil> Perfil { get; set; }
        public DbSet<PerfilAcceso> PerfilAcceso { get; set; }
        public DbSet<Acceso> Acceso { get; set; }
        public DbSet<Producto> Producto { get; set; }
        public DbSet<ProductoUnidad> ProductoUnidad { get; set; }
        public DbSet<Programa> Programa { get; set; }
        public DbSet<Provincia> Provincia { get; set; }
        public DbSet<RectificarMedida> RectificarMedida { get; set; }
        public DbSet<RectificarMedidaDetalle> RectificarMedidaDetalle { get; set; }
        public DbSet<Registro> Registro { get; set; }
        public DbSet<Sector> Sector { get; set; }
        public DbSet<SolicitudTomaMedida> SolicitudTomaMedida { get; set; }
        public DbSet<SolicitudTomaMedidaDetalle> SolicitudTomaMedidaDetalle { get; set; }
        public DbSet<Suplidor> Suplidor { get; set; }
        public DbSet<TipoProducto> TipoProducto { get; set; }
        public DbSet<TipoRegistro> TipoRegistro { get; set; }
        public DbSet<TomaMedida> TomaMedida { get; set; }
        public DbSet<Unidad> Unidad { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioPerfil> UsuarioPerfil { get; set; }
        public DbSet<Vehiculo> Vehiculo { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ConfigurarAlmacenModelConfig();
            modelBuilder.ConfigurarAperturaCajaModelConfig();
            modelBuilder.ConfigurarBitacoraModelConfig();
            modelBuilder.ConfigurarCajaModelConfig();
            modelBuilder.ConfigurarCargamentoVehiculoModelConfig();
            modelBuilder.ConfigurarCiudadModelConfig();
            modelBuilder.ConfigurarClasificacionContableModelConfig();
            modelBuilder.ConfigurarClienteModelConfig();
            modelBuilder.ConfigurarCompraModelConfig();
            modelBuilder.ConfigurarCompraDetalleModelConfig();
            modelBuilder.ConfigurarConceptoModelConfig();
            modelBuilder.ConfigurarConduceDetalleModelConfig();
            modelBuilder.ConfigurarConduceModelConfig();
            modelBuilder.ConfigurarCotizacionDetalleModelConfig();
            modelBuilder.ConfigurarCotizacionModelConfig();
            modelBuilder.ConfigurarCuadreCajaModelConfig();
            modelBuilder.ConfigurarDesgloseCorrederaDetalleModelConfig();
            modelBuilder.ConfigurarDesgloseCorrederaModelConfig();
            modelBuilder.ConfigurarDesgloseEfectivoAsignadoCajaModelConfig();
            modelBuilder.ConfigurarDespachoDetalleModelConfig();
            modelBuilder.ConfigurarDespachoModelConfig();
            modelBuilder.ConfigurarDistribucionEnvioModelConfig();
            modelBuilder.ConfigurarDistribucionEnvioVehiculoModelConfig();
            modelBuilder.ConfigurarEmpleadoModelConfig();
            modelBuilder.ConfigurarEmpleadoHerramientaModelConfig();
            modelBuilder.ConfigurarEnsambladoModelConfig();
            modelBuilder.ConfigurarEnsambladoDetalleModelConfig();
            modelBuilder.ConfigurarEntidadModelConfig();
            modelBuilder.ConfigurarEntidadDireccionModelConfig();
            modelBuilder.ConfigurarEntidadTelefonoModelConfig();
            modelBuilder.ConfigurarEnvioModelConfig();
            modelBuilder.ConfigurarEnvioDetalleModelConfig();
            modelBuilder.ConfigurarErrorCuadreCajaModelConfig();
            modelBuilder.ConfigurarEsquemaModelConfig();
            modelBuilder.ConfigurarFacturaModelConfig();
            modelBuilder.ConfigurarFacturaDetalleModelConfig();
            modelBuilder.ConfigurarHerramientaModelConfig();
            modelBuilder.ConfigurarInventarioModelConfig();
            modelBuilder.ConfigurarInventarioProductoGastableModelConfig();
            modelBuilder.ConfigurarInventarioVentaModelConfig();
            modelBuilder.ConfigurarMovimientoInventarioModelConfig();
            modelBuilder.ConfigurarMovimientoPagoCajaModelConfig();
            modelBuilder.ConfigurarNominaModelConfig();
            modelBuilder.ConfigurarNominaDetalleModelConfig();
            modelBuilder.ConfigurarPaisModelConfig();
            modelBuilder.ConfigurarPerfilModelConfig();
            modelBuilder.ConfigurarPerfilPermisoModelConfig();
            modelBuilder.ConfigurarPermisoModelConfig();
            modelBuilder.ConfigurarProductoModelConfig();
            modelBuilder.ConfigurarProductoUnidadModelConfig();
            modelBuilder.ConfigurarProgramaModelConfig();
            modelBuilder.ConfigurarProvinciaModelConfig();
            modelBuilder.ConfigurarRectificarMedidaModelConfig();
            modelBuilder.ConfigurarRectificarMedidaDetalleModelConfig();
            modelBuilder.ConfigurarRegistroModelConfig();
            modelBuilder.ConfigurarSectorModelConfig();
            modelBuilder.ConfigurarSolicitudTomaMedidaModelConfig();
            modelBuilder.ConfigurarSolicitudTomaMedidaDetalleModelConfig();
            modelBuilder.ConfigurarSuplidorModelConfig();
            modelBuilder.ConfigurarTipoProductoModelConfig();
            modelBuilder.ConfigurarTipoRegistroModelConfig();
            modelBuilder.ConfigurarTomaMedidaModelConfig();
            modelBuilder.ConfigurarUnidadModelConfig();
            modelBuilder.ConfigurarUsuarioModelConfig();
            modelBuilder.ConfigurarUsuarioPerfilModelConfig();
            modelBuilder.ConfigurarVehiculoModelConfig();
        }
    }
}
