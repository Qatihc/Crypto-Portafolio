import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    /* XCAMBIAR A FALSE */
    open: true
  },
  reducers: {
    open: state => {
      state.open = true;
    },
    close: state => {
      state.open = false;
    }
  },
})

export const selectNavbarOpen = (state) => {
  return state.navbar.open;
}

export const { open, close } = navbarSlice.actions;
export default navbarSlice.reducer;