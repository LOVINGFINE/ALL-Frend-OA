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
    console.log(response);

    return Promise.resolve(response || {});
    // const { status, data } = response;
    // console.log(response);

    // const silent = false;
    // if (!silent) {
    //   // 启用拦截
    //   switch (status) {
    //     case 200:

    //     case 201:
    //       return Promise.resolve(data || {});
    //     default:
    //       return Promise.reject(data);
    //   }
    // } else {
    //   return Promise.resolve(response.data || {});
    // }
  },
  fail: (error: AxiosError): Promise<unknown> => {
    console.log(error.response?.data);

    return Promise.reject(error.response?.data);
  },
};
