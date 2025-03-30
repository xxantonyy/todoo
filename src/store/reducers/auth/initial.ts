import { IAuthState } from './types';

const initialState: IAuthState = {
  token: null,
  username: null,
  actionProcessing: false,
  auth: false,
};

export default initialState;
