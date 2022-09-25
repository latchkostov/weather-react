import { Current, Day } from "../services/weather/forecast-weather";
import { TempUnit } from "../store/slices/preferences-slice";

const degreesC = " °C";
const degreesF = " °F";

export const getDayPrefenceDisplayString = (
  tempObject: Day,
  temperatureUnit: TempUnit
) => {
  return {
    minTemp:
      temperatureUnit === TempUnit.Celcius
        ? tempObject.mintemp_c + degreesC
        : tempObject.mintemp_f + degreesF,
    maxTemp:
      temperatureUnit === TempUnit.Fahrenheit
        ? tempObject.maxtemp_c + degreesC
        : tempObject.maxtemp_f + degreesF,
  };
};

export const getCurrentTempDislayString = (
  tempObject: Current,
  temperatureUnit: TempUnit
) => {
  return {
    temp:
      temperatureUnit === 0
        ? tempObject.temp_c + degreesC
        : tempObject.temp_f + degreesF,
  };
};
