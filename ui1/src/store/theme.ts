import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isDark: boolean,
  isDarkMenu: boolean,
  colorPrimary: string,
  isMobile: boolean,
  [name: string]: any,
}

const initialState: InitialState = {
  colorPrimary: "#1677FF",
  colorTextBase: "#fff",
  isDark: true,
  isDarkMenu: true,
  borderRadius: 5,
  isMobile: false
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.isDark = !state.isDark;
      state.colorTextBase = state.isDark ? "#fff" : "#000"
    },
    toggleDarkMenu: (state) => {
      state.isDarkMenu = !state.isDarkMenu;
    },
    setColorPrimary: (state, action: PayloadAction<string>) => {
      state.colorPrimary = action.payload;
    },
    setBorderRadius: (state, action: PayloadAction<number>) => {
      state.borderRadius = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    reset: (state) => {
      state = initialState;
    }
  }
})
export const { toggleDark, toggleDarkMenu, setColorPrimary, setBorderRadius, setIsMobile, reset } = themeSlice.actions;
export default themeSlice.reducer;