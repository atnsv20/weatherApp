import {
  WiDaySunny,
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiShowers,
  WiStormShowers,
  WiDayStormShowers,
  WiRain,
  WiDaySnowWind,
  WiDaySnow,
  WiSnow,
  WiSleet,
  WiHot,
  WiSnowflakeCold,
  WiCloudyWindy,
  WiNightClear,
  WiNightPartlyCloudy,
  WiNightCloudy,
  WiNightShowers,
  WiNightThunderstorm,
  WiNightAltSnow,
  WiWindy,
  WiThunderstorm,
} from 'react-icons/wi';

interface IconMap {
  [key: number]: JSX.Element;
}

const iconMap: IconMap = {
  1: <WiDaySunny />,
  2: <WiDaySunny />,
  3: <WiDaySunnyOvercast />,
  4: <WiDaySunnyOvercast />,
  5: <WiDaySunnyOvercast />,
  6: <WiDayCloudy />,
  7: <WiCloudy />,
  8: <WiCloudy />,
  11: <WiFog />,
  12: <WiShowers />,
  13: <WiShowers />,
  14: <WiStormShowers />,
  15: <WiDayStormShowers />,
  16: <WiDayStormShowers />,
  17: <WiDayStormShowers />,
  18: <WiRain />,
  19: <WiDaySnowWind />,
  20: <WiDaySnowWind />,
  21: <WiDaySnow />,
  22: <WiSnow />,
  23: <WiSnow />,
  24: <WiSnow />,
  25: <WiSleet />,
  26: <WiSleet />,
  29: <WiSleet />,
  30: <WiHot />,
  31: <WiSnowflakeCold />,
  32: <WiCloudyWindy />,
  33: <WiNightClear />,
  34: <WiNightClear />,
  35: <WiNightPartlyCloudy />,
  36: <WiNightCloudy />,
  37: <WiNightCloudy />,
  38: <WiNightCloudy />,
  39: <WiNightShowers />,
  40: <WiNightShowers />,
  41: <WiNightThunderstorm />,
  42: <WiNightThunderstorm />,
  43: <WiNightAltSnow />,
  44: <WiNightAltSnow />,
  45: <WiWindy />,
  46: <WiThunderstorm />,
};

export default iconMap;
