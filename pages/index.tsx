import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { setTemperatureUnit } from "../store/slices/preferences-slice";
import { useQuery } from "@tanstack/react-query";

import { DayCard } from "../components/day-card";
import styles from "../styles/Home.module.css";
import {
  Forecastday,
  ForecastWeather,
} from "../services/weather/forecast-weather";

export default function Home() {
  const dispatch = useDispatch();

  const getGreeting = useCallback((date: Date) => {
    const dateHours = date.getHours();
    switch (true) {
      case dateHours >= 0 && dateHours < 12:
        return "Good Morning";
      case dateHours >= 12 && dateHours < 18:
        return "Good Afternoon";
      default:
        return "Good Evening";
    }
  }, []);

  const [currentLocationDisplay, setCurrentLocationDisplay] = useState("");

  const [forecastWeather, setForecastWeather] = useState<ForecastWeather>(null);

  const {
    isLoading: isForecastWeatherLoading,
    error: forecastWeatherError,
    data: forecaseWeatherData,
  } = useQuery(["forecastWeather"], () =>
    fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=056c2d58d7bf4d3d9de234918222009&q=London&days=7&aqi=no&alerts=no"
    ).then((res) => res.json())
  );

  useEffect(() => {
    if (forecaseWeatherData) {
      setCurrentLocationDisplay(
        ` - ${forecaseWeatherData.location.name}, ${forecaseWeatherData.location.country}`
      );
      setForecastWeather(forecaseWeatherData);
    }
  }, [forecaseWeatherData]);

  const greeting = useMemo(() => {
    if (forecastWeather?.location?.localtime) {
      return getGreeting(new Date(forecastWeather.location.localtime));
    }
    return "";
  }, [forecastWeather?.location?.localtime]);

  if (isForecastWeatherLoading || !forecastWeather) return "Loading...";

  if (forecastWeatherError)
    return "An error has occurred: " + forecastWeatherError;

  return (
    <div className={`w-full h-screen flex flex-col`}>
      <h1 className={`${styles.header} text-center text-md uppercase`}>
        <span className="inline-block">{greeting}</span>
        <span className="inline-block">{currentLocationDisplay}</span>
        <span className="inline-block">
          {" "}
          - {forecaseWeatherData.current.temp_f} °F
        </span>
        <img
          className="inline-block"
          src={forecaseWeatherData.current.condition.icon}
          style={{ height: "32px" }}
        />
        <select onChange={(e) => {
          dispatch(setTemperatureUnit(+e.target.value));
        }}>
          <option value={0} label="Celcius" />
          <option value={1} label="Fahrenheit" />
        </select>
      </h1>
      <div className={`${styles.body} flex justify-center flex-grow w-full`}>
        <div className={`${styles.cardsContainer} grid w-full px-5 py-5`}>
          {forecastWeather.forecast.forecastday.map((d: Forecastday) => (
            <DayCard key={d.date_epoch} day={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
