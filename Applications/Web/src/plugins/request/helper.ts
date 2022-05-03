import axios, {
  AxiosRequestConfig,
  AxiosStatic,
  AxiosResponse,
  AxiosError,
} from "axios";

export class Request {
  constructor(props?: InitRequestProps) {
    this.axios = axios;
    this.axios.interceptors.response.use(
      this.defaultInterceptors.success,
      this.defaultInterceptors.fail
    );
    this.axios.interceptors.request.use(
      this.defaultBeforeRequest.config,
      this.defaultBeforeRequest.error
    );
    if (props) {
      const { interceptors, beforeRequest, BASE_PATH, TIMEOUT } = props;
      if (interceptors) {
        this.axios.interceptors.response.use(
          interceptors.success || this.defaultInterceptors.success,
          interceptors.fail || this.defaultInterceptors.fail
        );
      }
      if (beforeRequest) {
        this.axios.interceptors.request.use(
          beforeRequest.config || this.defaultBeforeRequest.config,
          beforeRequest.error || this.defaultBeforeRequest.error
        );
      }
      if (BASE_PATH) {
        // 服务器地址 API_PATH + * [path]
        this.axios.defaults.baseURL = BASE_PATH;
      }
      if (TIMEOUT) {
        this.axios.defaults.timeout = TIMEOUT || 30000;
      }
    }
  }
  /**
   * @method 请求拦截器
   * */
  get defaultBeforeRequest() {
    return {
      config: (params: AxiosRequestConfig): AxiosRequestConfig => {
        return params;
      },
      error: (res: AxiosError): Promise<AxiosError> => {
        // 返回错误
        return Promise.reject(res);
      },
    };
  }

  /**
   * @method 返回拦截器
   * */
  get defaultInterceptors() {
    return {
      success: (response: AxiosResponse): Promise<unknown> =>
        Promise.resolve(response.data || "success"),
      fail: (error: AxiosError): Promise<AxiosError> => Promise.reject(error),
    };
  }

  private axios: AxiosStatic;

  public send<T>(
    props: string | ActionType,
    config?: AxiosRequestConfig
  ): Promise<T> {
    if (typeof props === "string") {
      return axios.get(props, config);
    }
    const { path, method, data }: ActionType = props;
    switch (method) {
      case "get":
        return axios.get(path, config);
      case "post":
        return axios.post(path, data, config);
      case "put":
        return axios.put(path, data, config);
      case "patch":
        return axios.patch(path, data, config);
      case "delete":
        return axios.delete(path, config);
      case "options":
        return axios.options(path, config);
      default:
        return Promise.reject();
    }
  }
}

export interface ActionType {
  path: string;
  method?: "get" | "post" | "put" | "patch" | "delete" | "options";
  data?: {
    [key: string]: any;
  };
}

export interface InitRequestProps {
  BASE_PATH?: string;
  defaults?: AxiosRequestConfig;
  TIMEOUT?: number;
  interceptors?: {
    success?: (response: AxiosResponse) => Promise<unknown>;
    fail?: (error: AxiosError) => Promise<unknown>;
  };
  beforeRequest?: {
    config?: (params: AxiosRequestConfig) => AxiosRequestConfig;
    error?: (error: AxiosError) => Promise<AxiosError>;
  };
}
