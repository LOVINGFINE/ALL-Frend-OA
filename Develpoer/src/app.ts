import bodyParser from "body-parser";
import next from "next";
import { blue, green, red, yellow } from "colors-cli";
import cors from "cors";
import express from "express";
import path from "path";
import routes from "./app.routes";
import { AppSetting } from "./app.setting";
import fontHelper from "./utils/font";
import { EasyDate } from "./utils/date_format";
import { register } from "./routes/index";
import { info_log } from "./utils/info_log";

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
export default class AppServer {
  static info(text: string) {
    console.log(green(`     ${text}`));
  }

  static warning(text: string) {
    console.log(yellow(`>>> [${EasyDate.currentFullDate}] ${text}.\n`));
  }

  static error(text: string) {
    console.log(red(`>>> [${EasyDate.currentFullDate}] ${text}.\n`));
  }

  static print(text: string) {
    console.log(blue(`>>> [${EasyDate.currentFullDate}] ${text}.\n`));
  }

  run() {
    nextApp.prepare().then(() => {
      const server = express();
      const nextAppHandle = nextApp.getRequestHandler();
      server.use(cors());
      // 静态文件托管
      server.use(bodyParser.json());
      server.use(express.static(path.join(process.cwd(), "public")));
      server.use(
        "svg",
        express.static(path.join(process.cwd(), "public/.svg"))
      );
      server.get("*", (req, res, next) => {
        if (req.method === "GET" && req.path.indexOf("/api") === -1) {
          nextAppHandle(req, res);
        } else {
          next();
        }
      });
      server.use(register(routes));

      // 监听端口
      server.listen(AppSetting.port, () => {
        console.clear();
        info_log();
        this.listen();
      });
    });
  }

  listen() {
    fontHelper();
  }
}
