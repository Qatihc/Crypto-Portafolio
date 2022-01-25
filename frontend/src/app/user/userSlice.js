import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import userApi from "./userApi";
import { STATUS } from "../constants";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: localStorage.getItem('currentUser') || null,
    token: localStorage.getItem('token') || null,
    status: STATUS.IDLE,
    errorMsg: null,
  },
  reducers: {
    logout: state => {
      state.currentUser = null;
      state.token = null;
      return state;
    },
    resetError: state => {
      state.errorMsg = null;
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
        state.errorMsg = null;
      })
      .addMatcher(isAnyOf(login.rejected, signup.rejected), (state, action) => {
        state.status = STATUS.ERROR;
        state.errorMsg = action.error.message;
      })
  }
})

const login = createAsyncThunk('user/login', async (requestBody) => {
  const data = await userApi.login(requestBody);
  return {
    currentUser: data.username,
    token: data.token
  };
})

const signup = createAsyncThunk('user/signup', async (requestBody) => {
  await userApi.signup(requestBody);
  return;
})

export const currentUserSelector = (state) => {
  return state.user.currentUser;
}

export const errorSelector = (state) => {
  return state.user.errorMsg;
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

export const { logout, resetError } = userSlice.actions;
export { signup, login }
export default userSlice.reducer;