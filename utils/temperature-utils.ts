import { Day } from "../services/weather/forecast-weather";

export const getPrefenceDisplayString = (
  tempObject: Day,
  temperatureUnit: number
) => {
  const degreesC = "°C";
  const degreesF = "°F";
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
