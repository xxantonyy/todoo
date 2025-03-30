/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const HttpActions = (baseUrl: string) => {
  const config: AxiosRequestConfig = {
    baseURL: baseUrl,
    withCredentials: false,
    validateStatus: (status) => Boolean(status) /* status */,
  };

  const request = axios.create(config);

  const get = <TResponse>
    (
      url: string,
      params: any = {},
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<TResponse>> => {
    const config: AxiosRequestConfig = { params, ...options };
    return request.get(url, config);
  };

  const post = <TResponse>
    (
      url: string,
      data: any = {},
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<TResponse>> => request.post(url, data, options);

  const patch = <TResponse>
    (
      url: string,
      data: any = {},
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<TResponse>> => request.patch(url, data, options);

  const put = <TResponse>
    (
      url: string,
      data: any = {},
      options: AxiosRequestConfig = {},
    ): Promise<AxiosResponse<TResponse>> => request.put(url, data, options);

  const del = <TResponse>(
    url: string,
    params?: any,
    options: AxiosRequestConfig = {},
  ): Promise<AxiosResponse<TResponse>> => request.delete(url, {
      ...options,
      data: params?.body,
    });

  return {
    get, post, patch, put, del,
  };
};

export default HttpActions;
