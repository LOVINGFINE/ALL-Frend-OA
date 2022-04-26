import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}

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
  helper(data: { [key: string]: any }) {
    this.response.status(data.code).send(JSON.stringify(data));
  }
}