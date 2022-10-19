import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Forecastday } from "../../services/weather/forecast-weather";

export interface DayState {
  day?: Forecastday | any;
}

const initialState: DayState = {
  day: {},
};

export const forecastDaySlice = createSlice({
  name: "forecastDay",
  initialState,
  reducers: {
    setForecastDay: (state, action: PayloadAction<Forecastday>) => {
        state.day = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setForecastDay } = forecastDaySlice.actions;

export default forecastDaySlice.reducer;
