import svgToFont from "svgtofont";
import { AppStatus } from "../../app.setting";
import AppServer from "../../app";
import fs from "fs";
import { resolve } from "path";
import { EasyDate } from "../../utils/date_format";
import setting from "./setting";
import { remove_dir, cp_dir } from "../../utils";

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
  async writeDocument(init: Boolean): Promise<AppStatus> {
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
          `\\$${setting["font-name"]}-(?<key>.*):\"\\\\(?<value>.*)\";`,
          "g"
        );
        const item = regx.exec(ele);
        if (item?.groups && !unicode[item.groups["key"]]) {
          unicode[item.groups["key"]] = new DocumentItem({
            value: `\\u${item.groups["value"]}`,
            key: item.groups["key"],
          });
        }
      });
      fs.writeFile(
        setting["unicode-path"],
        JSON.stringify(unicode, null, "\t").replace(/\\u/g, "u"),
        (err) => {
          if (!err) {
            if (init) {
              AppServer.print("Font Helper init success");
            } else {
              AppServer.print("Font Helper success saved");
            }
            res(AppStatus.OK);
            this.removeFontFile();
            this.writeWeb().then(() => {
              remove_dir(resolve(__dirname, ".temp"));
            });
          } else {
            AppServer.error(JSON.stringify(err));
            rej(AppStatus.ERROR);
          }
        }
      );
    });
  }

  writeWeb() {
    return new Promise<void>((res) => {
      const { Web } = setting;
      const document = require(setting["unicode-path"]);
      const json: { [key: string]: any } = {};
      for (let key in document) {
        json[key] = document[key]["value"];
      }
      cp_dir({
        dir: setting["font-dist-path"],
        target: Web["output"],
      }).then(() => {
        fs.writeFile(
          `${Web["output"]}/${Web["style"]}`,
          Web["scssTemp"],
          (err) => {
            if (!err) {
              fs.writeFile(
                `${Web["output"]}/${Web["json"]}`,
                JSON.stringify(json, null, "\t").replace(/\\u/g, "u"),
                (err) => {
                  if (!err) {
                    AppServer.print("web font file write unicode json success");
                  } else {
                    AppServer.error(JSON.stringify(err));
                  }
                  res();
                }
              );
            } else {
              AppServer.error(JSON.stringify(err));
              res();
            }
          }
        );
      });
    });
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
    this.value = options["value"].replace("\\\\", "\\");
    this.svg_url = `/font-svg/${options["key"]}.svg`;
  }
}
