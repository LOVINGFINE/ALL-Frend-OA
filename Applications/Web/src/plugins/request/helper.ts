import axios, {
  AxiosRequestConfig,
  AxiosStatic,
  AxiosResponse,
  AxiosError,
} from "axios";

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

const { success, fail } = defaultInterceptors;
const { config, error } = defaultBeforeRequest;

export class Request {
  constructor(props?: InitRequestProps) {
    this.axios = axios;
    this.default(props && props.defaults);
    if (props) {
      const { interceptors, beforeRequest, BASE_PATH } = props;
      if (interceptors) {
        this.axios.interceptors.response.use(
          interceptors.success || success,
          interceptors.fail || fail
        );
      }
      if (beforeRequest) {
        this.axios.interceptors.request.use(
          beforeRequest.config || config,
          beforeRequest.error || error
        );
      }
      if (BASE_PATH) {
        // 服务器地址 API_PATH + * [path]
        this.axios.defaults.baseURL = BASE_PATH;
      }
    } else {
      this.axios.interceptors.response.use(success, fail);
      this.axios.interceptors.request.use(config, error);
    }
  }
  private axios: AxiosStatic;

  private TIMEOUT = 30000;

  private default(defaults?: AxiosRequestConfig) {
    // 超时时间
    if (defaults) {
      this.axios.defaults = defaults;
    } else {
      this.axios.defaults.timeout = this.TIMEOUT;
    }
  }

  public send(
    props: string | ActionType | Array<ActionType>
  ): Promise<unknown> {
    if (typeof props === "string") {
      return axios.get(props);
    }
    if (props instanceof Array) {
      return new Promise((resolve, reject) => {
        axios
          .all(props.map((ele) => this.send(ele)))
          .then(
            axios.spread((...theArgs) => {
              resolve([...theArgs]);
            })
          )
          .catch((error) => {
            reject(error);
          });
      });
    }
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
  method?: string;
  data?: string;
}

export interface InitRequestProps {
  BASE_PATH?: string;
  defaults?: AxiosRequestConfig;
  interceptors?: {
    success?: (response: AxiosResponse) => Promise<unknown>;
    fail?: (error: AxiosError) => Promise<unknown>;
  };
  beforeRequest?: {
    config?: (params: AxiosRequestConfig) => AxiosRequestConfig;
    error?: (error: AxiosError) => Promise<AxiosError>;
  };
}
