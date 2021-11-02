import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { linksMain } from "../../Components/Utilities/StylesProvider";
// import { RootState } from "../store";

export interface NavStates {
  [key: string | symbol]: any;
  isDarkMode: boolean;
  lang: string;
  langFlag: string;
  Primary: string;
  Secondary: string;
}

type PayloadTypesColor = {
  [key: string]: any;
  Primary?: string;
  Secondary?: string;
};

type PayloadTypesLang = {
  lang: string;
  langFlag: string;
};

const initialState: NavStates = {
  isDarkMode: true,
  lang: linksMain.langs[0].label,
  langFlag: linksMain.langs[0].flag,
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
    changeLang: (state, action: PayloadAction<PayloadTypesLang>) => {
      if (
        state.lang !== action.payload.lang &&
        state.langFlag !== action.payload.langFlag
      ) {
        state.lang = action.payload.lang;
        state.langFlag = action.payload.langFlag;
      }
    },
  },
});

export const { changeLang, changeTheme, changeColor, resetColor } =
  navSlices.actions;

export default navSlices.reducer;
