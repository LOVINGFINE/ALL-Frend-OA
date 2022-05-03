import { Request } from "./helper";
import { InitRequestProps } from "@/plugins/request/helper";
import { interceptors, beforeRequest } from "./interceptor";

const setting: InitRequestProps = {
  BASE_PATH: "http://localhost:8080",
  interceptors,
  beforeRequest,
};

export default new Request(setting).send;
