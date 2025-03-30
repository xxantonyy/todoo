/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import { AxiosRequestConfig, AxiosResponse } from 'axios';

import HttpActions from './HttpActions';
import {
  EQueryTypes, TServerResponseDataInput, TServerResponseDataOutput,
} from './types';

interface IQuery<TData, TDataConverted> {
  type: EQueryTypes;
  url: string;
  params?: any;
  options?: AxiosRequestConfig;
  converterSuccess?: (data: TData) => TDataConverted;
  validate?: (data: TData) => void;
}

const BaseAPI = (
  baseUrl: string,
  actions = HttpActions(baseUrl),
) => {
  const sendQuery = async <TData, TDataConverted>(
    query: IQuery<TData, TDataConverted>): Promise<TServerResponseDataOutput<TDataConverted>> => {
    let response: AxiosResponse<TServerResponseDataInput<TData>>;
    switch (query.type) {
    case EQueryTypes.POST:
      response = await actions.post<TServerResponseDataInput<TData>>(query.url, query.params, query.options);
      break;
    case EQueryTypes.DELETE:
      response = await actions.del<TServerResponseDataInput<TData>>(query.url, query.params);
      break;
    case EQueryTypes.PUT:
      response = await actions.put<TServerResponseDataInput<TData>>(query.url, query.params, query.options);
      break;
    case EQueryTypes.PATCH:
      response = await actions.patch<TServerResponseDataInput<TData>>(query.url, query.params, query.options);
      break;
    default:
      response = await actions.get<TServerResponseDataInput<TData>>(query.url, query.params, query.options);
      break;
    }

    const { data, status } = response;

    const success = status === 200 || status === 201;
    let resultData = null;
    if (success && typeof query.converterSuccess === 'function') {
      resultData = query.converterSuccess(data as TData);
    }

    const resultResponse: TServerResponseDataOutput<TDataConverted> = {
      success,
      data: resultData,
      errorMessage: data.message ? data.message : data.error,
      error: data.error,
      codeStatus: status,
    };

    return resultResponse;
  };

  return { sendQuery };
};

export default BaseAPI;
