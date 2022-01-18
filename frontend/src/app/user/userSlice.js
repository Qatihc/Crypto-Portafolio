import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import axios from "../axiosClient";
import userApi from "./userApi";
import { STATUS } from "./userConstants";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: localStorage.getItem('currentUser') || null,
    token: localStorage.getItem('token') || null,
    status: STATUS.IDLE
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
      .addCase(login.fulfilled, (state, action) => {
        const { currentUser, token } = action.payload;
        state.status = STATUS.SUCCESS,
        state.currentUser = currentUser;
        state.token = token;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
      })
      .addMatcher(isAnyOf(login.pending, signup.pending), (state, action) => {
        state.status = STATUS.LOADING;
      })
      .addMatcher(isAnyOf(login.rejected, signup.rejected), (state, action) => {
        state.status = STATUS.ERROR;
      })
  }
})

const login = createAsyncThunk('user/login', async (requestBody) => {
  const data = await userApi.login(requestBody);
  return data;
})

const signup = createAsyncThunk('user/signup', async (requestBody) => {
  await userApi.signup(requestBody);
  return;
})

export const currentUserSelector = (state) => {
  return state.user.currentUser;
}

export const persistUserMiddleware = store => next => action => {
  /* Cambiar esto que se va a romper muy facil */
  if (action.type === "user/login/fulfilled") {
    localStorage.setItem('currentUser', action.payload.currentUser);
    localStorage.setItem('token', action.payload.token);
  }
  else if (action.type === "user/logout") {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  return next(action);
}

export const { logout } = userSlice.actions;
export { signup, login }
export default userSlice.reducer;