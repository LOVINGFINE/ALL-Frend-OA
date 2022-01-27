import svgToFont from "svgtofont";
import { AppSetting, AppStatus } from "../../app.setting";
import AppServer from "../../app";
import fs from "fs";
import { resolve } from "path";
import { EasyDate } from "../../utils/date_format";
import setting from "./setting";
import { remove_dir } from "../../utils";

export class FontHelper {
  static async init() {
    await new FontHelper().write(true);
  }
  // 生成文件 修改配置
  async write(init = false) {
    try {
      const temp = console.log;
      console.log = () => {};

      await svgToFont({
        src: setting["svg-files-path"],
        dist: setting["font-dist-path"],
        fontName: setting["font-name"],
        emptyDist: true,
        outSVGPath: false,
        startUnicode: 0xea01,
        css: {
          fileName: "style",
          output: "src/helpers/font_helper/.temp",
        },
      });
      console.log = temp;
      await this.writeDocument(init);
      this.removeFontFile();
      return AppStatus.OK;
    } catch (e) {
      AppServer.error(JSON.stringify(e));
      return AppStatus.ERROR;
    }
  }
  writeDocument(init: Boolean): Promise<AppStatus> {
    return new Promise((res, rej) => {
      const unicode: any = require(setting["unicode-path"]);
      const contentString = fs
        .readFileSync(resolve(__dirname, `.temp/style.scss`))
        .toString()
        .replace(/[\n\s]+/g, "");

      const regx = new RegExp(
        `\\$${setting["font-name"]}-(.+?):\"(.+?)\";`,
        "g"
      );
      const list = contentString.match(regx);
      list?.forEach((ele) => {
        const regx = new RegExp(
          `\\$${setting["font-name"]}-(?<key>.*):\"(?<value>.*)\";`,
          "g"
        );
        const item = regx.exec(ele);
        if (item?.groups && !unicode[item.groups["key"]]) {
          unicode[item.groups["key"]] = new DocumentItem({
            value: item.groups["value"],
            key: item.groups["key"],
          });
        }
      });
      fs.writeFile(
        setting["unicode-path"],
        JSON.stringify(unicode, null, "\t"),
        (err) => {
          if (!err) {
            if (init) {
              AppServer.print("Font Helper init success");
            } else {
              AppServer.print("Font Helper success saved");
            }
            res(AppStatus.OK);
            this.writeWeb();
          } else {
            AppServer.error(JSON.stringify(err));
            rej(AppStatus.ERROR);
          }
        }
      );
    });
  }

  writeWeb() {
    const { Web } = setting;
    const document = require(setting["unicode-path"]);
    const json: { [key: string]: any } = {};
    for (let key in document) {
      json[key] = document[key]["value"];
    }

    fs.writeFile(`${Web["output"]}/${Web["style"]}`, Web["scssTemp"], (err) => {
      if (!err) {
        AppServer.print("web font write scss file success");
      } else {
        AppServer.error(JSON.stringify(err));
      }
    });

    fs.writeFile(
      `${Web["output"]}/${Web["json"]}`,
      JSON.stringify(json, null, "\t"),
      (err) => {
        if (!err) {
          AppServer.print("web font file write unicode json success");
        } else {
          AppServer.error(JSON.stringify(err));
        }
      }
    );
  }
  // 移除多余文件
  removeFontFile() {
    const files = fs.readdirSync(setting["font-dist-path"]);
    files.forEach((file) => {
      const outs = [
        `${setting["font-name"]}.svg`,
        `${setting["font-name"]}.symbol.svg`,
      ];
      if (outs.includes(file)) {
        fs.unlinkSync(`${setting["font-dist-path"]}/${file}`);
      }
      remove_dir(resolve(__dirname, ".temp"));
    });
  }

  static get(key?: string) {
    new FontHelper();
    const document = require(setting["unicode-path"]);
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
    this.svg_url = `http://${AppSetting.host}:${AppSetting.port}/font-svg/${options["key"]}.svg`;
  }
}
