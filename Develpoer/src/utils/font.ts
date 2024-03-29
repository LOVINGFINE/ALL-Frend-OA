import fs from "fs";
import { resolve } from "path";
import svgToFont from "svgtofont";
import { EasyDate } from "./esay_date";
import { remove_dir } from "./file";
import AppServer from "../app";
interface FontConfigProps {
  "font-name": string;
  "svg-files-path": string;
  "font-dist-path": string;
}

const setting: FontConfigProps = {
  "font-name": "all-frend-oa-font",
  "svg-files-path": "src/static/svg",
  "font-dist-path": resolve(process.cwd(), "src/static/style/fonts"),
};

class DocumentItem {
  key = "";
  value = "";
  create_time = EasyDate.currentFullDate;
  update_time = EasyDate.currentFullDate;
  svg_url = "";
  constructor(options: { [k: string]: any }) {
    this.key = options["key"];
    this.value = options["value"];
    this.svg_url = `/svg/${options["key"]}.svg`;
  }
}

const getItemByStyle = (key: string) => {
  let target = null;
  // 获取style中json转化
  const contentString = fs
    .readFileSync(resolve(__dirname, `.temp/style.scss`))
    .toString()
    .replace(/[\n\s]+/g, "");

  const regx = new RegExp(`\\$${setting["font-name"]}-(.+?):\"(.+?)\";`, "g");
  const itemRegx = new RegExp(
    `\\$${setting["font-name"]}-(?<key>.*):\"\\\\(?<value>.*)\";`,
    "g"
  );
  const list = contentString.match(regx) || [];
  for (let i = 0; i < list.length; i++) {
    const ele = list[i];
    const item = itemRegx.exec(ele);
    if (item?.groups && key === item.groups["key"]) {
      target = new DocumentItem({
        value: `\\u${item.groups["value"]}`,
        key: item.groups["key"],
      });
      break;
    }
  }
  return target;
};
const getStyleString = (base64: string) => {
  return `@font-face {
    font-family: "${setting["font-name"]}";
    src: url("data:font/ttf;charset=utf-8;base64,${base64}")
      format("truetype");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }`;
};
const transformFont = async (key?: string) => {
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
        output: "src/utils/.temp",
      },
    });

    console.log = temp;
    let target = null;
    if (key) {
      target = getItemByStyle(key);
    }
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
    fs.readFile(
      `${setting["font-dist-path"]}/${setting["font-name"]}.ttf`,
      (err, res) => {
        if (!err) {
          const base64 = res.toString("base64");
          const str = getStyleString(base64);
          fs.writeFileSync(
            resolve(__dirname, `../static/style/iconfont.css`),
            str
          );
          remove_dir(resolve(__dirname, "../static/style/fonts"));
        }
      }
    );
    if (!key) {
      AppServer.print("font files init success");
    }
    remove_dir(resolve(__dirname, ".temp"));

    return target;
  } catch (e) {
    return null;
  }
};

export default transformFont;
