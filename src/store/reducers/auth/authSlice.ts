import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initial";
import { TAppThunkAPI } from "@/store/types";
import { EAuthActionDataTypes } from "./types";
import { IAuthApi } from "@/api/AuthApi/types";
import { getNotify } from "@/components/Notify/Notify";

const getAuth = createAsyncThunk<
  {
    token: string | null,
    username: string | null,
    auth: boolean,
  },
  {
    username: string,
    password: string,
    callback?: () => void
  },
  TAppThunkAPI
>(
  EAuthActionDataTypes.AUTH,
  async ({ username, password, callback }, thunkAPI) => {
    const { getState, extra: { api } } = thunkAPI;
    const state = getState();

    const response = await api.auth.auth(username, password);

    if (response.success) {
      callback?.();
      getNotify('Авторизация прошла успешно', 'success');
      api.toDo.getTodos(response.data.token);
      return {
        token: response.data.token,
        username: response.data.username,
        auth: true,
      }
    } else {
      console.error(`error in ${EAuthActionDataTypes.AUTH}, message: ${response.errorMessage}`);
    }

    getNotify(response.errorMessage, 'error');
    state.auth.actionProcessing = false;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.actionProcessing = false;
      state.auth = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAuth.fulfilled, (state, action: PayloadAction<IAuthApi>) => {
      state.token = action.payload?.token || null;
      state.username = action.payload?.username || null;
      state.actionProcessing = false;
      state.auth = action.payload?.auth;
    })
  },
});

const actions = {
  getAuth,
}

export const authActions = { ...authSlice.actions, ...actions }
export default authSlice.reducer;