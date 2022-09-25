import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum TempUnit {
  Celcius = 0,
  Fahrenheit = 1,
}

export interface PreferencesState {
  temperatureUnit: TempUnit;
}

const initialState: PreferencesState = {
  temperatureUnit: TempUnit.Celcius,
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<TempUnit>) => {
      state.temperatureUnit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTemperatureUnit } = preferencesSlice.actions;

export default preferencesSlice.reducer;
