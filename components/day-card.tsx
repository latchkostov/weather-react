import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../store/store";
import { Forecastday } from "../services/weather/forecast-weather";
import { getPrefenceDisplayString } from "../utils/temperature-utils";
import styles from "./day-card.module.css";

export const DayCard = ({ day }) => {
  const temperatureUnit = useSelector(
    (state: RootState) => state.prefences.temperatureUnit
  );
  const dayOfWeek = useMemo(() => {
    const date = new Date(day.date);
    return date.toLocaleDateString("en-US", { weekday: "short" });
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
          Low: {getPrefenceDisplayString(day.day, temperatureUnit).minTemp}
        </span>
        <span className="text-xs">
          High: {getPrefenceDisplayString(day.day, temperatureUnit).maxTemp}
        </span>
      </div>
    </div>
  );
};
