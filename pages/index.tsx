import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTime } from "luxon";
import { setTemperatureUnit } from "../store/slices/preferences-slice";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Image from "next/image";

import { DayCard } from "../components/day-card";
import {
  Forecastday,
  ForecastWeather,
} from "../services/weather/forecast-weather";
import { getCurrentTempDislayString } from "../utils/temperature-utils";
import { RootState } from "../store/store";

import styles from "../styles/Home.module.scss";
const forecastQueryKey = "forecastWeather";
const getWeatherData = async () => {
  const prefix = `${location.protocol}//${location.host}`;
  return fetch(
    `${prefix}/api/weather/forecast.json?key=056c2d58d7bf4d3d9de234918222009&q=London&days=7&aqi=no&alerts=no`
  ).then((res) => res.json());
};

export default function Home() {
  const dispatch = useDispatch();
  const temperatureUnit = useSelector(
    (state: RootState) => state.prefences.temperatureUnit
  );

  const [currentLocationDisplay, setCurrentLocationDisplay] = useState("");

  const [forecastWeather, setForecastWeather] = useState<ForecastWeather>(null);

  const {
    isLoading: isForecastWeatherLoading,
    error: forecastWeatherError,
    data: forecaseWeatherData,
  } = useQuery([forecastQueryKey], getWeatherData);

  useEffect(() => {
    if (forecaseWeatherData?.location) {
      setCurrentLocationDisplay(
        `${forecaseWeatherData.location.name}, ${forecaseWeatherData.location.country}`
      );
      setForecastWeather(forecaseWeatherData);
    }
  }, [forecaseWeatherData]);

  const dateTimeStringForLocation = useMemo(() => {
    if (
      forecastWeather?.location?.localtime_epoch &&
      forecastWeather?.location?.tz_id
    ) {
      const dateTime = DateTime.fromSeconds(
        forecastWeather.location.localtime_epoch,
        { zone: forecastWeather.location.tz_id }
      );
      return dateTime.toLocaleString(DateTime.DATETIME_MED);
    }
    return "";
  }, [
    forecastWeather?.location?.localtime_epoch,
    forecastWeather?.location?.tz_id,
  ]);

  if (isForecastWeatherLoading || !forecastWeather) return "Loading...";

  if (forecastWeatherError)
    return "An error has occurred: " + forecastWeatherError;

  return (
    <div className={`w-full h-screen flex flex-col`}>
      <h1 className={`${styles.header} text-center text-md uppercase`}>
        <span className="inline-block">{currentLocationDisplay} | {dateTimeStringForLocation}</span>
        <span className="inline-block">
          &nbsp;{" | "}
          {
            getCurrentTempDislayString(
              forecaseWeatherData.current,
              temperatureUnit
            ).temp
          }
        </span>
        <Image
          alt={forecaseWeatherData.current.condition.text}
          className="inline-block"
          src={`https:${forecaseWeatherData.current.condition.icon}`}
          width={32}
          height={32}
        />

        <span className="mx-3">|</span>
        <span className="mr-4">Temp Unit:</span>
        <label>
          <select
            onChange={(e) => {
              dispatch(setTemperatureUnit(+e.target.value));
            }}
          >
            <option value={0} label="C" />
            <option value={1} label="F" />
          </select>
        </label>
      </h1>
      <div className={`${styles.body} flex justify-center flex-grow w-full`}>
        <div className={`${styles.cardsContainer} grid w-full px-5 py-5`}>
          {forecastWeather.forecast.forecastday.map((d: Forecastday) => (
            <DayCard key={d.date_epoch} forecastDay={d} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([forecastQueryKey], getWeatherData);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
