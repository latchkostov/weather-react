import React, { useMemo } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Forecastday } from "../services/weather/forecast-weather";

import type { RootState } from "../store/store";
import { getDayPrefenceDisplayString } from "../utils/temperature-utils";
import styles from "./day-card.module.scss";
import { setForecastDay } from "../store/slices/day-slice";

type DayCardProps = {
  forecastDay: Forecastday;
};

export const DayCard = ({ forecastDay }: DayCardProps) => {
  const day = useMemo(() => forecastDay.day, [forecastDay.day]);
  const date = useMemo(() => forecastDay.date, [forecastDay.date]);
  const dispatch = useDispatch();
  const temperatureUnit = useSelector(
    (state: RootState) => state.prefences.temperatureUnit
  );
  const dayOfWeek = useMemo(() => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }, [date]);

  return (
    <div
      className={`${styles.dayCardContainer} shadow-lg rounded flex flex-col justify-between flex-shrink-0 items-center`}
    >
      <div
        className={`${styles.cardHeaderContainer} rounded-t flex justify-center w-full mb-3`}
      >
        <h1 className={"text-sm my-2 uppercase"}>{dayOfWeek}</h1>
      </div>
      <div className={`${styles.weatherImageContainer}`}>
        <Image
          alt={day.condition.text}
          src={`https:${day.condition.icon}`}
          width={64}
          height={64}
        />
      </div>
      <div className="flex flex-col py-2">
        <span className="text-xs">
          Low: {getDayPrefenceDisplayString(day, temperatureUnit).minTemp}
        </span>
        <span className="text-xs">
          High: {getDayPrefenceDisplayString(day, temperatureUnit).maxTemp}
        </span>
      </div>
      <div>
        <button
          type="button"
          className={styles["hourly-button"]}
          onClick={() => dispatch(setForecastDay(forecastDay))}
        >
          View Hourly
        </button>
      </div>
    </div>
  );
};
