import { RouterHelper } from "../helpers/router";
import { Request, Response } from "express";
import MongodbHelper from "../helpers/mongo";

export function find_fonts_by(request: Request, response: Response) {
  const helper = new RouterHelper(request, response);
  const mongo = new MongodbHelper("font_unicodes");
  if (helper.query["key"] !== undefined) {
    mongo.find({ key: helper.query["key"] }).then((res: any) => {
      const data = res && res.length ? res[0] : null;
      helper.helper({
        code: 200,
        data,
        message: "ok",
      });
    });
  } else {
    mongo.find().then((res) => {
      helper.helper({
        code: 200,
        data: res,
        message: "ok",
      });
    });
  }
}
