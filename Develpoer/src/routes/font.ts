import { RouterHelper } from "../utils/router";
import { Request, Response } from "express";
import { FontHelper } from "../helpers/font_helper";
export default class FontRouter extends RouterHelper {
  constructor(request: Request, response: Response) {
    super(request, response);
  }
  override get() {
    const id = this.query["id"] || "";
    if (typeof id === "string") {
      const data = FontHelper.get(id);
      this.helper({
        code: 200,
        message: "ok",
        data,
      });
    } else {
      this.helper({
        code: 200,
        message: "ok",
        data: [],
      });
    }
  }
  override post() {}
}
