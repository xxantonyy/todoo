/* eslint-disable no-unused-vars */
import { StoreEnhancer } from 'redux';

export const persistState: (arg: string[]) => StoreEnhancer<
  {
    dispatch: unknown;
  },
  {}
>;
