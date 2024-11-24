import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBolt,
  faCloud,
  faCloudRain,
  faQuestion,
  faSnowflake,
  faSun,
} from '@fortawesome/free-solid-svg-icons';

export const getWeatherIcon = (weatherCode: number): IconProp => {
  switch (weatherCode) {
    // clear or mostly clear skies
    case 0:
      return faSun;

    // fog or rime fog
    case 1:
    case 2:
    case 3:
    case 45:
    case 48:
      return faCloud;

    // rain (slight, moderate, heavy, freezing)
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
      return faCloudRain;

    // snowfall (slight, moderate, heavy)
    case 71:
    case 73:
    case 75:
    case 77:
      return faSnowflake;

    // rain showers (slight, moderate, violent)
    case 80:
    case 81:
    case 82:
      return faCloudRain;

    // snow showers (slight, heavy)
    case 85:
    case 86:
      return faSnowflake;

    // thunderstorms (slight, moderate)
    case 95:
    case 96:
    case 99:
      return faBolt;

    default:
      return faQuestion;
  }
};

export const getOrdinal = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
