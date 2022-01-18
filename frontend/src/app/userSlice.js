import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "./userApi";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    token: localStorage.getItem('token'),
    status: 'idle'
  },
  reducers: {
    logout: state => {
      state.currentUser = null;
      state.token = null;
      return state;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'pending';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { username, token } = action.payload;
        state.status = 'success';
        state.currentUser = username;
        state.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'error';
        console.log(action.error);
      })
  }
})

const login = createAsyncThunk('user/login', async (requestBody) => {
  try {
    const data = userApi.login(requestBody);
    return data;
  } catch (err) {
    throw new Error(err);
  }
})

export const currentUserSelector = (state) => {
  return state.user.currentUser;
}

export const { logout } = userSlice.actions;
export { login }
export default userSlice.reducer;