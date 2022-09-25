import React from "react";
import styles from "./day-card.module.css";

export const DayCard = ({ day }) => {
  return (
    <div className={`${styles.dayCardContainer} shadow-lg rounded flex flex-col justify-between flex-shrink-0 items-center`}>
      <div className={`${styles.cardHeaderContainer} rounded-t flex justify-center w-full mb-3`}>
        <h1 className={"text-sm my-2 uppercase"}>{day}</h1>
      </div>
      <div className={`${styles.weatherImageContainer}`}>
        {/* <img alt="" src={sun} /> */}
      </div>
      <div className="flex flex-col py-2">
        <span className="text-xs">Low: 75 F</span>
        <span className="text-xs">High: 82 F</span>
      </div>
    </div>
  );
};
