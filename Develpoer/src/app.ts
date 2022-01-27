import bodyParser from "body-parser";
import { blue, green, red, yellow } from "colors-cli";
import cors from "cors";
import express from "express";
import path from "path";
import routes from "./app.routes";
import { AppSetting } from "./app.setting";
import { FontHelper } from "./helpers/font_helper";
import { EasyDate } from "./utils/date_format";
import { register } from "./utils/router";
import { info_log } from "./utils/info_log";
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
    const app = express();
    app.use(cors());
    // 静态文件托管
    app.use(express.static(path.join(process.cwd(), "public")));
    app.use(bodyParser.json());
    app.use(register(routes));
    // 监听端口
    app.listen(AppSetting.port, () => {
      console.clear();
      info_log();
      this.listen();
    });
  }

  listen() {
    FontHelper.init();
  }
}
