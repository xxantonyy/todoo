import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";


const HttpActions = (baseUrl: string) => {
  const config: AxiosRequestConfig = {
    baseURL: baseUrl,
    withCredentials: false,
    validateStatus: status => Boolean(status) /* status */,
  }

  const request = axios.create(config)

  const get = <TResponse>
    (
      url: string,
      params: any = {},
      options: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<TResponse>> => {

    const config: AxiosRequestConfig = { params, ...options };
    return request.get(url, config);
  };

  const post = <TResponse>
    (
      url: string,
      data: any = {},
      options: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<TResponse>> => {
    return request.post(url, data, options);
  };

  const patch = <TResponse>
    (
      url: string,
      data: any = {},
      options: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<TResponse>> => {
    return request.patch(url, data, options);
  };

  const put = <TResponse>
    (
      url: string,
      data: any = {},
      options: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<TResponse>> => {
    return request.put(url, data, options);
  };

  const del = <TResponse>
    (
      url: string,
      data: any = {},
      options: AxiosRequestConfig = {}
    ): Promise<AxiosResponse<TResponse>> => {
    return request.delete(url, options);
  };

  return { get, post, patch, put, del }
}

export default HttpActions;
