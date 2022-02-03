import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import userApi from "./userApi";
import { STATUS } from "../constants";
import { getCurrentUser, saveCurrentUser, deleteCurrentUser } from "./persistUser";


const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: getCurrentUser().username || null,
    token: getCurrentUser().token || null,
    status: STATUS.IDLE,
    errorMsg: null,
  },
  reducers: {
    logout: state => {
      state.username = null;
      state.token = null;
      return state;
    },
    resetUserError: state => {
      state.errorMsg = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { username, token } = action.payload;
        state.status = STATUS.SUCCESS,
        state.username = username;
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
  const { username, token } = await userApi.login(requestBody);
  return {
    username,
    token
  };
})

const signup = createAsyncThunk('user/signup', async (requestBody) => {
  await userApi.signup(requestBody);
  return;
})

export const selectCurrentUser = (state) => {
  return state.user.username;
}

export const selectUserError = (state) => {
  return state.user.errorMsg;
}

export const persistUserMiddleware = store => next => action => {
  if (action.type === "user/login/fulfilled") {
    saveCurrentUser(action.payload);
  }
  else if (action.type === "user/logout") {
    deleteCurrentUser();
  }
  return next(action);
}

export const { logout, resetUserError } = userSlice.actions;
export { signup, login }
export default userSlice.reducer;