import { IAction, IActionData } from '@/store/types';

export enum EAuthActionDataTypes {
  AUTH = 'auth/AUTH',
}

export interface IAuthState {
  token: string | null;
  username: string | null;
  actionProcessing: boolean;
  auth: boolean;
}

export interface TAuthPagesPayload {

}

export interface IAuthAction<TArgs> extends IAction<EAuthActionDataTypes, TAuthPagesPayload, TArgs> {}
export interface IAuthsActionData extends IActionData<EAuthActionDataTypes, TAuthPagesPayload> {}
