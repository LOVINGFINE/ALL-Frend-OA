import express, { Request, Response, Router } from "express";
import { IncomingHttpHeaders } from "http";
import { AppSetting } from "../app.setting";

export interface ItemProps {
  path: string;
  module: any;
}

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

export const register = (routes: ItemProps[]): Router => {
  const router = express.Router();
  routes.forEach(({ path, module }) => {
    const hander = (req: Request, res: Response) => {
      new module(req, res).hander();
    };

    router.all(AppSetting.APIPATH + path, hander);
  });
  return router;
};

export class RouterHelper {
  constructor(request: Request, response: Response) {
    this.headers = request.headers;
    this.params = request.params;
    this.response = response;
    this.method = request.method;
    this.query = request.query;
    this.body = request.body;
  }

  headers: IncomingHttpHeaders;
  params: { [key: string]: string };
  query: ParsedQs;
  response: Response;
  method: String;
  body: any;
  hander() {
    switch (this.method) {
      case "GET":
        this.get();
        break;
      case "POST":
        this.post();
        break;
      case "PATCH":
        this.patch();
        break;
      case "PUT":
        this.put();
        break;
      case "DELETE":
        this.delete();
        break;
      default:
        this.helper({
          code: 404,
          message: "not api",
        });
    }
  }
  helper(data: { [key: string]: any }) {
    this.response.status(data.code).send(JSON.stringify(data));
  }

  get() {
    this.helper({
      code: 405,
      message: "not allow",
    });
  }
  post() {
    this.helper({
      code: 405,
      message: "not allow",
    });
  }
  patch() {
    this.helper({
      code: 405,
      message: "not allow",
    });
  }
  put() {
    this.helper({
      code: 405,
      message: "not allow",
    });
  }
  delete() {
    this.helper({
      code: 405,
      message: "not allow",
    });
  }
}

export { default as FontHelper } from "./font";
