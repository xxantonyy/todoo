import { ThunkAction } from 'redux-thunk';

import { api, rootReducer, store } from './store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export type TApi = typeof api;

// то что передается в редюсер при диспатче в санках
export interface IActionData<TDataType extends string, TPayload> {
  type: TDataType;
  payload?: TPayload;
}
export type IAppThunk<TDataType extends string, TPayload, ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  { api: TApi }/* unknown */,
  IActionData<TDataType, TPayload> /* AnyAction */
>;

export type TAppThunkAPI = {
  extra: {
    api: TApi,
  },
  state: RootState,
}

export type IAction<TDataType extends string, TPayload, TActionArgs> = (args: TActionArgs) => IAppThunk<TDataType, TPayload>;
