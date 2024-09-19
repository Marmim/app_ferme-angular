import { INavData } from '@coreui/angular';

export const items: INavData[] = [
  {
    name: 'Météo Certifiée',
    url: '/certified-weather',
    icon: 'fa-solid fa-circle-info',
    class: 'custom-nav-item',
  },
  {
    name: 'Prévisions Météo',
    url: '/weather-forecast',
    icon: 'fa-solid fa-chart-column',
    class: 'custom-nav-item',

  },
  {
    name: 'Méteo Agrégée',
    url: '/weather-agre',
    icon: 'fa-solid fa-square-root-variable',
    class: 'custom-nav-item',

  },
  {
    name: 'Fermes',
    url: '/map',
    icon: 'fa-solid fa-map-location-dot',
    class: 'custom-nav-item',

  },
];
