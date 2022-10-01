import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Day } from "../services/weather/forecast-weather";

import type { RootState } from "../store/store";
import { getDayPrefenceDisplayString } from "../utils/temperature-utils";
import styles from "./day-card.module.css";

type DayCardProps = {
  day: Day;
  date: string;
};

export const DayCard = ({ day, date }: DayCardProps) => {
  const temperatureUnit = useSelector(
    (state: RootState) => state.prefences.temperatureUnit
  );
  const dayOfWeek = useMemo(() => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { weekday: "short" });
  }, [day]);

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
        {/* <img alt="" src={sun} /> */}
      </div>
      <div className="flex flex-col py-2">
        <span className="text-xs">
          Low: {getDayPrefenceDisplayString(day, temperatureUnit).minTemp}
        </span>
        <span className="text-xs">
          High: {getDayPrefenceDisplayString(day, temperatureUnit).maxTemp}
        </span>
      </div>
    </div>
  );
};
