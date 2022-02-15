import { AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";
/**
 * @method 请求拦截器
 * */
export const beforeRequest = {
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
export const interceptors = {
  success: (response: AxiosResponse): Promise<unknown> => {
    const { status } = response;
    const silent = false;
    if (!silent) {
      // 启用拦截
      if (status === 200) {
        const { code, data } = response.data;
        switch (code) {
          case 200:
            break;
          case 201:
            break;
          default:
            break;
        }
        return Promise.resolve(data || {});
      } else {
        return Promise.reject(response.data || status);
      }
    } else {
      return Promise.resolve(response.data || "success");
    }
  },
  fail: (error: AxiosError): Promise<unknown> => {
    return Promise.reject(error);
  },
};
