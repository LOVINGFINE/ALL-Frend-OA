import { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
/**
 * @method 请求拦截器
 * */
export const defaultBeforeRequest = {
  config: (params: AxiosRequestConfig): AxiosRequestConfig => {
    return params;
  },
  error: (res: AxiosError): Promise<AxiosError> => {
    // 返回错误
    return Promise.reject(res);
  },
};

/**
 * @method 返回拦截器
 * */
export const defaultInterceptors = {
  success: (response: AxiosResponse): Promise<unknown> =>
    Promise.resolve(response.data || "success"),
  fail: (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
};
