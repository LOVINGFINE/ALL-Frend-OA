import express from "express";
import { AppSetting } from "./app.setting";
import bodyParser from "body-parser";
import { FontHelper } from "./helpers/font_helper";
import path from "path";
import cors from "cors";
import routes from "./app.routes";
import { register } from "./utils/router";
import color from "colors-cli";
import { EasyDate } from "./utils/date_format";

export default class AppServer {
  static async run() {
    const app = express();
    app.use(cors());
    // 静态文件托管
    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.json());
    app.use(register(routes));
    // 监听端口
    app.listen(AppSetting.port, () => {
      AppServer.listen();
    });
  }
  static listen() {
    console.clear();
    EasyDate.printLine("Developer Server In listen");
    const { green, blue } = color;
    console.log(
      green(`\n=> IP: http://${AppSetting.LOCAL_IP}:${AppSetting.port}`),
      green(`\n=> Local: http://${AppSetting.host}:${AppSetting.port}`),
      blue(`\n\n`)
    );
    FontHelper.init();
  }
}
