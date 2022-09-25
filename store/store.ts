import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./slices/preferences-slice";

export const store = configureStore({
  reducer: {
    prefences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
