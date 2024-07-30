import { INavData } from '@coreui/angular';

export const items: INavData[] = [
  {
    name: 'Météo Certifiée',
    url: '/current-weather',
    icon: 'fa-solid fa-circle-info',
  },
  {
    name: 'Prévisions Météo',
    url: '/weather-forecast',
    icon: 'fa-solid fa-chart-column',
  },
  {
    name: 'Méteo Agrégée',
    url: '/weather-agro',
    icon: 'fa-solid fa-square-root-variable',
  },
  {
    name: 'Fermes',
    url: '/map',
    icon: 'fa-solid fa-map-location-dot',
  },
];
