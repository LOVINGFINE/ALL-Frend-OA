import svgToFont from "./utils";
import { resolve } from "path";
import { AppSetting, AppStatus } from "../../app.setting";
import AppServer from "../../app";

import fs from "fs";
import { EasyDate } from "../../utils/date_format";
export class FontHelper {
  fontName = "all-frend-oa-font";

  static async init() {
    await new FontHelper().write(true);
  }
  // 生成文件 修改配置
  async write(init = false) {
    const { fontName } = this;
    try {
      await svgToFont({
        src: "public/svg",
        dist: resolve(__dirname, ".dev/font"),
        fontName,
        emptyDist: true,
        outSVGPath: false,
        startUnicode: 0xea01,
        css: {
          fileName: "style",
          output: "src/helpers/font_helper/.dev/styles",
        },
      });
      this.removeFontFile();
      await this.writeDocument(init);
      return AppStatus.OK;
    } catch (e) {
      AppServer.error(JSON.stringify(e));
      return AppStatus.ERROR;
    }
  }
  writeDocument(init: Boolean): Promise<AppStatus> {
    return new Promise((res, rej) => {
      try {
        const { fontName } = this;
        const json: { [k: string]: any } = require("./unicode.json");
        const contentString = fs
          .readFileSync(resolve(__dirname, ".dev/styles/style.scss"))
          .toString()
          .replace(/[\n\s]+/g, "");
        const regx = new RegExp(`\\$${fontName}-(.+?):\"(.+?)\";`, "g");
        const list = contentString.match(regx);
        list?.forEach((ele) => {
          const regx = new RegExp(
            `\\$${fontName}-(?<key>.*):\"(?<value>.*)\";`,
            "g"
          );
          const item = regx.exec(ele);
          if (item?.groups && !json[item.groups["key"]]) {
            json[item.groups["key"]] = new DocumentItem({
              value: item.groups["value"],
              key: item.groups["key"],
            });
          }
        });
        fs.writeFile(
          resolve(__dirname, "unicode.json"),
          JSON.stringify(json, null, "\t"),
          (err) => {
            if (!err) {
              if (init) {
                AppServer.print("Font Helper init success");
              } else {
                AppServer.print("Font Helper success saved");
              }

              res(AppStatus.OK);
            } else {
              rej(AppStatus.ERROR);
            }
          }
        );
      } catch (err) {
        rej(AppStatus.ERROR);
      }
    });
  }

  // 移除多余文件
  removeFontFile() {
    const { fontName } = this;
    const files = fs.readdirSync(resolve(__dirname, ".dev/font"));
    files.forEach((file) => {
      const outs = [`${fontName}.svg`, `${fontName}.symbol.svg`];
      if (outs.includes(file)) {
        fs.unlinkSync(resolve(__dirname, ".dev/font/" + file));
      }
    });
    const styles = fs.readdirSync(resolve(__dirname, ".dev/styles"));
    styles.forEach((file) => {
      if (file === `style.styl`) {
        fs.unlinkSync(resolve(__dirname, ".dev/styles/" + file));
      }
    });
  }

  static get(key?: string) {
    new FontHelper();
    const document = require("./unicode.json");
    if (!!key) {
      return document[key];
    } else {
      const list = [];
      for (let key in document) {
        list.push({
          ...document[key],
          id: key,
        });
      }
      return list;
    }
  }
}

class DocumentItem {
  key = "";
  value = "";
  createTime = EasyDate.currentFullDate;
  svg_url = "";
  constructor(options: { [k: string]: any }) {
    this.key = options["key"];
    this.value = options["value"];
    this.svg_url = `http://${AppSetting.host}:${AppSetting.port}/svg/${options["key"]}.svg`;
  }
}
