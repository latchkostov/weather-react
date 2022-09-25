import {
  Current,
  Day,
  ForecastWeather,
} from "../services/weather/forecast-weather";

const degreesC = "°C";
const degreesF = "°F";

export const getDayPrefenceDisplayString = (
  tempObject: Day,
  temperatureUnit: number
) => {
  return {
    minTemp:
      temperatureUnit === 0
        ? tempObject.mintemp_c + degreesC
        : tempObject.mintemp_f + degreesF,
    maxTemp:
      temperatureUnit === 0
        ? tempObject.maxtemp_c + degreesC
        : tempObject.maxtemp_f + degreesF,
  };
};

export const getCurrentTempDislayString = (
  tempObject: Current,
  temperatureUnit: number
) => {
  return {
    temp:
      temperatureUnit === 0
        ? tempObject.temp_c + degreesC
        : tempObject.temp_f + degreesF,
  };
};
