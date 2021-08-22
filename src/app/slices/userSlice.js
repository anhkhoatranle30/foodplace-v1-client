import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../apis/userApi";

export const loginUserAction = createAsyncThunk(
  "users/login",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await userApi.login(email, password);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkApi.rejectWithValue(err.response.data.error);
    }
  }
);

export const registerUserAction = createAsyncThunk(
  "users/register",
  async ({ email, password }, thunkApi) => {
    try {
      const response = await userApi.register(email, password);
      return response.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  status: "idle",
  data: {},
  token: null,
  error: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUserAction: (state) => {
      // state.status = "idle";
      // state.data = {};
      // state.token = null;
      // state.error = null;
      return initialState;
    },
  },
  extraReducers: {
    [loginUserAction.pending]: (state, action) => {
      state.status = "loading";
    },
    [loginUserAction.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    },
    [loginUserAction.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    [registerUserAction.pending]: (state, action) => {
      state.status = "loading";
    },
    [registerUserAction.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUserAction.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
  },
});

export const { logoutUserAction } = userSlice.actions;
export default userSlice.reducer;
