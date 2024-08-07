export class AppConst {
  public static api: string;
  public static authority: string;
  public static local: string;
}

export class EndPointSelect {
  // BANCA MOVIL
  public static readonly bancaMovilSucursalItemSelect = '/api/banca-movil/admin/sucursal/item-select';
  public static readonly bancaMovilEntidadBancariaTransferenciaItemSelect
    = '/api/banca-movil/admin/entidad-bancaria-transferencia/item-select';
  public static readonly bancaMovilConceptoCuentaAhorrosLista = '/api/banca-movil/admin/concepto-cuenta-ahorros/lista';
  public static readonly bancaMovilTipoPagoLista = '/api/banca-movil/admin/tipo-pago/lista';
  public static readonly bancaMovilTipoCertificacionItemSelect = '/api/banca-movil/admin/tipo-certificacion/item-select';
  public static readonly bancaMovilTipoServicioItemSelect = '/api/banca-movil/admin/tipo-servicio-reclamacion/servicio-item-select';
  public static readonly bancaMovilTipoReclamacionItemSelect = '/api/banca-movil/admin/tipo-servicio-reclamacion/reclamacion-item-select';

  // EVALUACION DE CREDITO
  public static readonly evaluacionCreditoMiembro = '/api/evaluacion-creditos/admin/miembro/item-select';
  public static readonly evaluacionCreditoComite = '/api/evaluacion-creditos/admin/comite/item-select';
  public static readonly evaluacionCreditoPoliticaComite = '/api/evaluacion-creditos/admin/politica-comite/item-select';
  public static readonly evaluacionCreditoPoliticaComiteItemSelectComite
    = '/api/evaluacion-creditos/admin/politica-comite/item-select-comite';
  public static readonly evaluacionCreditoRazonCambioEstado = '/api/evaluacion-creditos/admin/razon-cambio-estado/item-select';
  public static readonly evaluacionCreditoRazonRechazoSolicitud = '/api/evaluacion-creditos/admin/razon-rechazo-solicitud/item-select';

  // GENERALES
  public static readonly generalesPerfil = '/api/generales/admin/perfil/item-select';
  public static readonly generalesUsuarioAdmin = '/api/generales/admin/usuario-admin/item-select';

  // INDICADORES DE APROBACION
  public static readonly indicadoresAprobacionesIndicadoresConfiguracion =
    '/api/indicadores-aprobaciones/admin/indicadores-configuracion/item-select';
  public static readonly indicadoresAprobacionesCarreraSueldo = '/api/indicadores-aprobaciones/admin/carrera-sueldo/item-select';
  public static readonly indicadoresAprobacionesCarreraSueldoTodos = '/api/indicadores-aprobaciones/admin/carrera-sueldo/item-select-todos';
  public static readonly indicadoresAprobacionesTipoVariableAprobacion
    = '/api/indicadores-aprobaciones/admin/tipo-variable-aprobacion/item-select';

  // SOLICITUD DE PRESTAMOS
  public static readonly solicitudPrestamosAgencia = '/api/solicitud-prestamos/admin/agencia/item-select';
  public static readonly solicitudPrestamosCampoObligatorioCliente
    = '/api/solicitud-prestamos/admin/campos-obligatorios-cliente/item-select';
  public static readonly solicitudPrestamosCampoObligatorioGarantia
    = '/api/solicitud-prestamos/admin/campos-obligatorios-garantia/item-select';
  public static readonly solicitudPrestamosCampoObligatorioSolicitud
    = '/api/solicitud-prestamos/admin/campos-obligatorios-solicitud/item-select';
  public static readonly solicitudPrestamosCaracteristica = '/api/solicitud-prestamos/admin/caracteristica/item-select';
  public static readonly solicitudPrestamosClasificacionAcuerdo = '/api/solicitud-prestamos/admin/clasificacion-acuerdo/item-select';
  public static readonly solicitudPrestamosClasificacion = '/api/solicitud-prestamos/admin/clasificacion/item-select';
  public static readonly solicitudPrestamosClasificacionTipo = '/api/solicitud-prestamos/admin/clasificacion/item-select-tipo';
  public static readonly solicitudPrestamosClasificacionFondo = '/api/solicitud-prestamos/admin/clasificacion-fondo/item-select';
  public static readonly solicitudPrestamosConfiguracionArchivo = '/api/solicitud-prestamos/admin/configuracion-archivo/item-select';
  public static readonly solicitudPrestamosFondo = '/api/solicitud-prestamos/admin/fondo/item-select';
  public static readonly solicitudPrestamosFrecuencia = '/api/solicitud-prestamos/admin/frecuencia';
  public static readonly solicitudPrestamosGrupo = '/api/solicitud-prestamos/admin/grupo/item-select';
  public static readonly solicitudPrestamosMoneda = '/api/solicitud-prestamos/admin/moneda/item-select';
  public static readonly solicitudPrestamosOficialNegocio = '/api/solicitud-prestamos/admin/oficial-negocio/item-select';
  public static readonly solicitudPrestamosPrioridad = '/api/solicitud-prestamos/admin/prioridad/item-select';
  public static readonly solicitudPrestamosProducto = '/api/solicitud-prestamos/admin/producto/item-select';
  public static readonly solicitudPrestamosPromotor = '/api/solicitud-prestamos/admin/promotor/item-select';
  public static readonly solicitudPrestamosRepresentante = '/api/solicitud-prestamos/admin/representante/item-select';
  public static readonly solicitudPrestamosSucursalAgencia = '/api/solicitud-prestamos/admin/sucursal-agencia/item-select';
  public static readonly solicitudPrestamosSucursal = '/api/solicitud-prestamos/admin/sucursal/item-select';
  public static readonly solicitudPrestamosTipoAcuerdo = '/api/solicitud-prestamos/admin/tipo-acuerdo';
  public static readonly solicitudPrestamosTipoCalculo = '/api/solicitud-prestamos/admin/tipo-calculo';
  public static readonly solicitudPrestamosTipoCentroEstudio = '/api/solicitud-prestamos/admin/tipo-centro-estudio/item-select';
  public static readonly solicitudPrestamosTipoGarantiaRegistro = '/api/solicitud-prestamos/admin/tipo-garantia-registro/item-select';
  public static readonly solicitudPrestamosTipoPrestamo = '/api/solicitud-prestamos/admin/tipo-prestamo/item-select';
  public static readonly solicitudPrestamosUsuarioCore = '/api/solicitud-prestamos/admin/usuario-core/item-select';
  public static readonly solicitudPrestamosTipoMora = '/api/solicitud-prestamos/admin/tipo-mora/item-select';
  public static readonly solicitudPrestamosProposito = '/api/solicitud-prestamos/admin/proposito/item-select';
  public static readonly solicitudPrestamosLugarResidencia = '/api/solicitud-prestamos/admin/lugar-residencia/item-select';
  public static readonly solicitudPrestamosEstadoSolicitud = '/api/solicitud-prestamos/admin/estado-solicitud/item-select';
  public static readonly solicitudPrestamosTitulo = '/api/solicitud-prestamos/user/titulo/item-select';
  public static readonly solicitudPrestamosGradoAcademico = '/api/solicitud-prestamos/user/grado-academico/item-select';
  public static readonly solicitudPrestamosSector = '/api/solicitud-prestamos/user/sector/item-select';
  public static readonly solicitudPrestamosEnsanche = '/api/solicitud-prestamos/user/ensanche/item-select';
  public static readonly solicitudPrestamosEmpresaTrabajo = '/api/solicitud-prestamos/user/empresa-trabajo/item-select';
  public static readonly solicitudPrestamosPuestoTrabajo = '/api/solicitud-prestamos/user/puesto-trabajo/item-select';

  public static readonly solicitudPrestamosCarrera = '/api/solicitud-prestamos/user/carrera/item-select';
  public static readonly solicitudPrestamosCentroEstudio = '/api/solicitud-prestamos/user/centro-estudio/item-select';
  public static readonly solicitudPrestamosNacionalidad = '/api/solicitud-prestamos/user/nacionalidad/item-select';
  public static readonly solicitudPrestamosOcupacion = '/api/solicitud-prestamos/user/ocupacion/item-select';
  public static readonly solicitudPrestamosPais = '/api/solicitud-prestamos/user/pais/item-select';
  public static readonly solicitudPrestamosProfesion = '/api/solicitud-prestamos/user/profesion/item-select';
  public static readonly solicitudPrestamosProvincia = '/api/solicitud-prestamos/user/provincia/item-select';
  public static readonly solicitudPrestamosParentesco = '/api/solicitud-prestamos/user/parentesco/item-select';

  public static readonly indicadoresFinalidad = '/api/indicadores-aprobaciones/admin/finalidad/item-select';;
  public static readonly indicadoresScoringGarantia = '/api/indicadores-aprobaciones/admin/grupo-garantia/item-select';;
  public static readonly indicadoresTipoProductoScoring = '/api/indicadores-aprobaciones/admin/tipo-producto-scoring/item-select';;
  public static readonly indicadoresSituacionFamiliar = '/api/indicadores-aprobaciones/admin/situacion-familiar/item-select';
  public static readonly indicadoresSituacionResidencia = '/api/indicadores-aprobaciones/admin/situacion-residencia/item-select';
  public static readonly indicadoresLugarResidencia = '/api/indicadores-aprobaciones/admin/lugar-residencia/item-select';
  public static readonly indicadoresTipoCliente = '/api/indicadores-aprobaciones/admin/tipo-cliente/item-select';
  public static readonly indicadoresTipoVinculacion = '/api/indicadores-aprobaciones/admin/tipo-vinculacion/item-select';
  public static readonly indicadoresTipoPersona = '/api/indicadores-aprobaciones/admin/tipo-persona/item-select';
  public static readonly indicadoresActividadEconomica = '/api/indicadores-aprobaciones/admin/actividad-economica/item-select';

}
