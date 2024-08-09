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
