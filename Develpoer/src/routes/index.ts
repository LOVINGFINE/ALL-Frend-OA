import express, { Request, Response, Router } from "express";
import { IncomingHttpHeaders } from "http";
import setting from "../app.setting";

export const importModule = (path: string) => {
  return () => import(path.replace("@/", "./"));
};

export interface ItemProps {
  path: string;
  module: any;
}

export const register = (routes: ItemProps[]): Router => {
  const router = express.Router();
  routes.forEach(({ path, module }) => {
    const HelperModule = importModule(module) as any;
    const hander = (req: Request, res: Response) =>
      new HelperModule(req, res).hander();
    router.all(setting.APIPATH + path, hander);
  });
  return router;
};

export class RouterHelper {
  constructor(request: Request, response: Response) {
    this.headers = request.headers;
    this.params = request.params;
    this.response = response;
    this.method = request.method;
  }

  headers: IncomingHttpHeaders;
  params: { [key: string]: string };
  response: Response;
  method: String;

  hander() {
    switch (this.method) {
      case "GET":
        this.get();
        break;
      case "POST":
        this.get();
        break;
      case "PATCH":
        this.get();
        break;
      case "PUT":
        this.get();
        break;
      case "DELETE":
        this.get();
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
