import { Request } from "./helper";
import { InitRequestProps } from "@/plugins/request/helper";
import { interceptors, beforeRequest } from "./interceptor";

const setting: InitRequestProps = {
  BASE_PATH: "/",
  interceptors,
  beforeRequest,
};

export default new Request(setting).send;
