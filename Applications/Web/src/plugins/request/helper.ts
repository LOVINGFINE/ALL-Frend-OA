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

  public send<T>(props: string | ActionType): Promise<T> {
    if (typeof props === "string") {
      return axios.get(props);
    }
    // if (props instanceof Array) {
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .all(props.map((ele) => this.send<T>(ele)))
    //       .then(
    //         axios.spread((...theArgs) => {
    //           resolve([...theArgs] as T);
    //         })
    //       )
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // }
    const { path, method, data }: ActionType = props;
    switch (method) {
      case "get":
        return axios.get(path);
      case "post":
        return axios.post(path, data);
      case "put":
        return axios.put(path, data);
      case "patch":
        return axios.patch(path, data);
      case "delete":
        return axios.delete(path);
      case "options":
        return axios.options(path);
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
