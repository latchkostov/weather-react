import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./slices/preferences-slice";
import forecastDayReducer from "./slices/day-slice";

export const store = configureStore({
  reducer: {
    prefences: preferencesReducer,
    forecastDay: forecastDayReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
