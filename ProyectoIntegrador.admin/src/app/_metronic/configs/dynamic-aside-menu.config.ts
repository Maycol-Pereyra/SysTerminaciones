/* eslint-disable @typescript-eslint/naming-convention */
export const DynamicAsideMenuConfig = {
  items: [
    {
      title: 'Inicio',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: '',
      page: '/inicio',
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
    },
    { section: 'Banca Móvil', sectionFeature: 'BancaMovil' },
    {
      title: 'Resumen',
      root: true,
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'BancaMovil',
      page: '/banca-movil-resumen',
      translate: 'MENU.DASHBOARD',
      bullet: 'dot',
    },
    {
      title: 'Clientes',
      root: true,
      bullet: 'dot',
      page: '/banca-movil-clientes',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'BancaMovil',
      submenu: [
        {
          title: 'Cliente',
          page: '/banca-movil-clientes/usuario',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Solicitud de acceso',
          page: '/banca-movil-clientes/solicitud-usuario',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Acceso de usuarios',
          page: '/banca-movil-clientes/login-historico',
          // permission: 'accessToECommerceModule'
        }
      ]
    },

    {
      title: 'Transacciones',
      root: true,
      bullet: 'dot',
      page: '/banca-movil-transacciones',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'BancaMovil',
      submenu: [
        {
          title: 'Transferencias',
          page: '/banca-movil-transacciones/solicitud-transferencia',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Trans. a otras entidades',
          page: '/banca-movil-transacciones/transferencia-otro-banco',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Pago a préstamo',
          page: '/banca-movil-transacciones/transaccion-pago-prestamo',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Pago de servicios',
          page: '/banca-movil-transacciones/transaccion-pago-servicio',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Transacciones múltiples',
          page: '/banca-movil-transacciones/solicitud-transaccion-multiple',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Consulta de certificación',
          page: '/banca-movil-transacciones/consulta-certificacion',
          feature: 'BancaMovilConsultaCertificacion'
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Servicios y reclamaciones',
          page: '/banca-movil-transacciones/servicio-reclamacion',
          // permission: 'accessToECommerceModule'
        }
      ]
    },

    {
      title: 'Generales',
      root: true,
      bullet: 'dot',
      page: '/banca-movil-generales',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'BancaMovil',
      submenu: [
        {
          title: 'Divisa',
          page: '/banca-movil-generales/moneda',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Sucursal',
          page: '/banca-movil-generales/sucursal',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Contacto',
          page: '/banca-movil-generales/sucursal-contacto',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Cuenta de banco',
          page: '/banca-movil-generales/informacion-cuenta-banco',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Cajero',
          page: '/banca-movil-generales/cajero',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Entidad bancaria',
          page: '/banca-movil-generales/entidad-bancaria-transferencia',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Tipo de pago',
          page: '/banca-movil-generales/tipo-pago',
          // permission: 'accessToECommerceModule'
        },
        // {
        //   title: 'Acceso de usuarios',
        //   page: '/banca-movil-generales/login-historico',
        //   // permission: 'accessToECommerceModule'
        // },
        {
          title: 'Configuración',
          page: '/banca-movil-generales/configuracion-general',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Tipo de certificación',
          page: '/banca-movil-generales/tipo-certificacion',
          feature: 'BancaMovilTipoCertificacion'
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Tipo de servicio y reclamación',
          page: '/banca-movil-generales/tipo-servicio-reclamacion',
          // permission: 'accessToECommerceModule'
        },
      ]
    },

    { section: 'Solicitud de Préstamos', sectionFeature: 'SolicitudPrestamos' },
    {
      title: 'Solicitud',
      root: true,
      bullet: 'dot',
      page: '/solicitud-prestamos',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'SolicitudPrestamos',
      submenu: [
        {
          title: 'Solicitudes',
          page: '/solicitud-prestamos/solicitud-prestamo',
        },
        {
          title: 'Actualización de datos',
          page: '/solicitud-prestamos/actualizacion-datos-solicitud',
        },
        {
          title: 'Producto',
          page: '/solicitud-prestamos/producto',
        },
        {
          title: 'Centro de estudio promotor',
          page: '/solicitud-prestamos/centro-estudio-promotor',
        },
        {
          title: 'Configuración',
          page: '/solicitud-prestamos/configuracion-general',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Configuración de archivos',
          page: '/solicitud-prestamos/configuracion-archivo',
        },
        {
          title: 'Link de descarga',
          page: '/solicitud-prestamos/link-descarga',
        },
        {
          title: 'Definición de campos',
          page: '/solicitud-prestamos/definicion-campo',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Campos obligatorios clientes',
          page: '/solicitud-prestamos/campos-obligatorios-cliente',
        },
        {
          title: 'Campos obligatorios solicitud',
          page: '/solicitud-prestamos/campos-obligatorios-solicitud',
        },
        {
          title: 'Campos obligatorios garantía',
          page: '/solicitud-prestamos/campos-obligatorios-garantia',
        },
        {
          title: 'Sucursal/Agencia',
          page: '/solicitud-prestamos/sucursal-agencia',
        },
        {
          title: 'Estados de las solicitudes',
          page: '/solicitud-prestamos/estado-solicitud-historial',
        }
      ]
    },
    {
      title: 'Evaluación Crédito',
      root: true,
      bullet: 'dot',
      page: '/evaluacion-creditos',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'GestionCredito',
      submenu: [
        {
          title: 'Miembros',
          page: '/evaluacion-creditos/miembro',
        },
        {
          title: 'Comité',
          page: '/evaluacion-creditos/comite',
        },
        {
          title: 'Política de comité',
          page: '/evaluacion-creditos/politica-comite',
        },
        {
          title: 'Razón de cambio de estado',
          page: '/evaluacion-creditos/razon-cambio-estado',
        },
        {
          title: 'Consulta de solicitud',
          page: '/evaluacion-creditos/evaluacion-solicitud-consulta',
        },
        {
          title: 'Análisis de crédito',
          page: '/evaluacion-creditos/evaluacion-solicitud-analisis-credito',
          feature: 'GestionCreditoAnalisisCredito'
        },
        {
          title: 'Análisis de aprobación',
          page: '/evaluacion-creditos/evaluacion-solicitud-analisis-aprobacion',
          feature: 'GestionCreditoAnalisisAprobacion'
        },
        {
          title: 'Configuración',
          page: '/evaluacion-creditos/configuracion-general',
        },
      ]
    },
    {
      title: 'Indicadores',
      root: true,
      bullet: 'dot',
      page: '/indicadores-aprobaciones',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'IndicadoresAprobaciones',
      submenu: [
        {
          title: 'Sueldo por carrera',
          page: '/indicadores-aprobaciones/carrera-sueldo',
          feature: 'IndicadoresAprobacionesCarreraSueldo'
        },
        {
          title: 'Indicador de aprobación',
          page: '/indicadores-aprobaciones/indicadores-configuracion',
        },
        {
          title: 'Indicador de riesgo',
          page: '/indicadores-aprobaciones/indicadores-riesgo-persona-configuracion',
          feature: 'IndicadoresAprobacionesRiesgoPersona'
        },
        {
          title: 'Configuración general',
          page: '/indicadores-aprobaciones/configuracion-general',
        },
        {
          title: 'Configuración de aprobación',
          page: '/indicadores-aprobaciones/configuracion-indicador-aprobacion',
        },
        {
          title: 'Configuración de riesgo',
          page: '/indicadores-aprobaciones/configuracion-indicador-riesgo',
          feature: 'IndicadoresAprobacionesRiesgoPersona'
        },
        {
          title: 'Evaluación solicitud',
          page: '/indicadores-aprobaciones/indicadores-evaluacion-solicitud',
        },
        {
          title: 'Lista PEP',
          page: '/indicadores-aprobaciones/politicamente-expuestos',
        },
        {
          title: 'Lista negra',
          page: '/indicadores-aprobaciones/lista-negra',
        },
        {
          title: 'Lista interna',
          page: '/indicadores-aprobaciones/lista-interna',
        },
      ]
    },
    { section: 'Prospección', sectionFeature: 'Prospecciones' },
    {
      title: 'Prospección',
      root: true,
      bullet: 'dot',
      page: '/prospecciones',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: 'Prospeccion',
      submenu: [
        {
          title: 'Configuración',
          page: '/prospecciones/configuracion-prospeccion',
        },
        {
          title: 'Consulta de cliente',
          page: '/prospecciones/consulta-cliente',
        },
        {
          title: 'Código iso de la nacionalidad',
          page: '/prospecciones/nacionalidad-codigo-iso',
          feature: 'ProspeccionesNacionalidadCodigoIso'
        }
      ]
    },
    { section: 'Generales', sectionFeature: 'Generales' },
    {
      title: 'Generales',
      root: true,
      bullet: 'dot',
      page: '/generales',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: '',
      submenu: [
        {
          title: 'Empresa',
          page: '/generales/empresa',
          // permission: 'accessToECommerceModule'
        },
        {
          title: 'Usuario',
          page: '/generales/usuario',
        },
        {
          title: 'Perfil',
          page: '/generales/perfil',
        },
        {
          title: 'Acceso de usuarios',
          page: '/generales/login-historico',
        },
        {
          title: 'Términos y condiciones',
          page: '/generales/terminos-condiciones',
        },
        {
          title: 'Consumo de información',
          page: '/generales/consumo-informacion',
        },
        {
          title: 'Consulta de uso',
          page: '/generales/consulta-uso',
        },
        {
          title: 'Configuración general',
          page: '/generales/configuracion-general',
        },
      ]
    },
  ]
};
