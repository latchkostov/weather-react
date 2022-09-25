import Head from "next/head";
import Image from "next/image";
import { DayCard } from "../components/day-card";
import styles from "../styles/Home.module.css";

export default function Home() {
  let title = "";
  const dateHours = new Date().getHours();
  switch (true) {
    case dateHours >= 0 && dateHours < 12:
      title = "Good Morning";
      break;
    case dateHours >= 12 && dateHours < 18:
      title = "Good Afternoon";
      break;
    default:
      title = "Good Evening";
      break;
  }

  return (
    <div className={`w-full h-screen flex flex-col`}>
      <h1 className={`${styles.header} text-center text-md uppercase`}>{title}</h1>
      <div className={`${styles.body} flex justify-center flex-grow w-full`}>
        <div className={`${styles.cardsContainer} grid w-full px-5 py-5`}>
          <DayCard day="Monday" />
          <DayCard day="Tuesday" />
          <DayCard day="Wednesday" />
          <DayCard day="Thursday" />
          <DayCard day="Friday" />
          <DayCard day="Saturday" />
          <DayCard day="Sunday" />
        </div>
      </div>
    </div>
  );
}
