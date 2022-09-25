import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PreferencesState {
  temperatureUnit: number;
}

const initialState: PreferencesState = {
  temperatureUnit: 0,
};

export const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setTemperatureUnit: (state, action: PayloadAction<number>) => {
      state.temperatureUnit = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTemperatureUnit } = preferencesSlice.actions;

export default preferencesSlice.reducer;
