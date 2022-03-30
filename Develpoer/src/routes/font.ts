import { RouterHelper } from "./index";
import { Request, Response } from "express";
import MongodbHelper from "../helpers/mongo";
export default class FontRouter extends RouterHelper {
  mongodbHelper = new MongodbHelper("font_unicodes");
  constructor(request: Request, response: Response) {
    super(request, response);
  }
  override get() {
    const key = this.query["key"] || "";
    if (key) {
      this.mongodbHelper.find({ key }).then((res: any) => {
        if (res.length === 1) {
          this.helper({
            code: 200,
            message: "ok",
            data: res[0],
          });
        } else {
          this.helper({
            code: 404,
            message: `not find ${key}`,
          });
        }
      });
    } else {
      this.mongodbHelper.find().then((res: any) => {
        this.helper({
          code: 200,
          message: "ok",
          data: res,
        });
      });
    }
  }
  override post() {}
}
