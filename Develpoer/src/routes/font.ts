import { RouterHelper } from ".";
import { Request, Response } from "express";

export default class FontRouter extends RouterHelper {
  constructor(request: Request, response: Response) {
    super(request, response);
  }
  override get() {
    console.log(this.method);
    this.helper({
      code: 200,
      message: "ok",
    });
  }
  post() {}
}
