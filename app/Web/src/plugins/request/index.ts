import { Request } from "./helper";
import { requestSetting } from "@/config";

export const request = new Request(requestSetting).send;
