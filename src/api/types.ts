/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-shadow */
export enum EQueryTypes {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}
export type TServerResponseDataInput<TData> = {
  status: number;
  result: TData;
  message?: string;
  error?: string;
}
export type T1xServerResponseDataInput<TData> = TData & { message?: string };
export type TServerResponseDataOutput<TDataConverted> = {
  success: boolean;
  data: TDataConverted | null;
  errorMessage: string;
  codeStatus: number;
  error: string | null;
}
