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
          title: 'Configuración general',
          page: '/generales/configuracion-general',
        },
      ]
    },
  ]
};
