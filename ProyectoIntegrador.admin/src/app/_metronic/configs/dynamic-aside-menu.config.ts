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
    { section: 'Compras', sectionFeature: 'Compras' },
    {
      title: 'Compras',
      root: true,
      bullet: 'dot',
      page: '/compras',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: '',
      submenu: [
        {
          title: 'Suplidor',
          page: '/compras/suplidor',
        },
      ]
    },
    { section: 'Ventas', sectionFeature: 'Ventas' },
    {
      title: 'Ventas',
      root: true,
      bullet: 'dot',
      page: '/ventas',
      icon: 'flaticon2-architecture-and-city',
      svg: './assets/media/svg/icons/Design/Layers.svg',
      feature: '',
      submenu: [
        {
          title: 'Cliente',
          page: '/ventas/cliente',
        },
        {
          title: 'Producto',
          page: '/ventas/producto',
        },
        {
          title: 'Categoria',
          page: '/ventas/categoria',
        },
        {
          title: 'Solicitud toma medida',
          page: '/ventas/solicitud-toma-medida',
        },
        {
          title: 'Cotización',
          page: '/ventas/cotizacion',
        },
        {
          title: 'Factura',
          page: '/ventas/factura',
        },
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
          title: 'Empleado',
          page: '/generales/empleado',
        },
        {
          title: 'Departamento',
          page: '/generales/departamento',
        },
        {
          title: 'Posición',
          page: '/generales/posicion',
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
          title: 'País',
          page: '/generales/pais',
        },
        {
          title: 'Provincia',
          page: '/generales/provincia',
        },
        {
          title: 'Ciudad',
          page: '/generales/ciudad',
        },
        {
          title: 'Sector',
          page: '/generales/sector',
        },
        {
          title: 'Unidad',
          page: '/generales/unidad',
        },
        {
          title: 'Vehiculo',
          page: '/generales/vehiculo',
        },
        {
          title: 'Color',
          page: '/generales/color',
        },
        {
          title: 'Herramienta',
          page: '/generales/herramienta',
        },
        {
          title: 'Configuración general',
          page: '/generales/configuracion-general',
        },
      ]
    },
  ]
};
