import { useSelector } from "react-redux";
import Router from "next/router";
import DayHourly from "../../components/day-hourly";
import { RootState } from "../../store/store";

const Hourly = () => {
  const forecastDay = useSelector((state: RootState) => state.forecastDay);
  if (!forecastDay?.day?.date) {
    console.log("no forecast day");
    Router.push("/");
  }
  console.log(forecastDay);
  return <DayHourly hourly={{}}></DayHourly>;
};

export default Hourly;
