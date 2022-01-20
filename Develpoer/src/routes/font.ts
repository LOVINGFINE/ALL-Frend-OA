import { RouterHelper } from "../utils/router";
import { Request, Response } from "express";

export default class FontRouter extends RouterHelper {
  constructor(request: Request, response: Response) {
    super(request, response);
  }
  override get() {
    console.log(this.params);
    this.helper({
      code: 200,
      message: "ok",
    });
  }
  post() {}
}
