import bodyParser from "body-parser";
import next from "next";
import { blue, green, red, yellow } from "colors-cli";
import cors from "cors";
import express from "express";
import path from "path";
import service from "./service";
import routes from "./app.router";
import { AppSetting } from "./app.setting";
import { EasyDate } from "./utils/esay_date";
import transformFont from "./utils/font";

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
      // next
      routes.forEach((ele) => {
        server.get(ele.path, (req, res) => {
          return nextApp.render(req, res, ele.component);
        });
      });

      server.use(service);
      // 监听端口
      const { LOCAL_IP, port, host } = AppSetting;
      server.listen(port, () => {
        console.clear();
        AppServer.info(
          `IP: http://${LOCAL_IP}:${port}           Local: http://${host}:${port} `
        );
        transformFont();
      });
    });
  }
}
