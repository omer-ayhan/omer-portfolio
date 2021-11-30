import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NavStates {
  [key: string | symbol]: any;
  isDarkMode: boolean;
  Primary: string;
  Secondary: string;
}

type PayloadTypesColor = {
  [key: string]: any;
  Primary?: string;
  Secondary?: string;
};

const initialState: NavStates = {
  isDarkMode: false,
  Primary: "#f79c00",
  Secondary: "#f44336",
};

export const navSlices = createSlice({
  name: "nav",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },

    changeColor: (state, action: PayloadAction<PayloadTypesColor>) => {
      if (
        state.Primary !== action.payload.Primary &&
        state.Secondary !== action.payload.Secondary
      ) {
        state.Primary = action.payload.Primary || state.Primary;
        state.Secondary = action.payload.Secondary || state.Secondary;
        console.log("change color");
      }
    },
    resetColor: (state, action: PayloadAction<PayloadTypesColor>) => {
      if (
        state.Primary !== action.payload.Primary ||
        state.Secondary !== action.payload.Secondary
      ) {
        state.Primary = action.payload.Primary || state.Primary;
        state.Secondary = action.payload.Secondary || state.Secondary;
        console.log("reset");
      }
    },
  },
});

export const { changeTheme, changeColor, resetColor } = navSlices.actions;

export default navSlices.reducer;
