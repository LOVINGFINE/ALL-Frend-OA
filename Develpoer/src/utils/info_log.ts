import { blue, green, bold, cyan } from "colors-cli";
import { AppSetting } from "../app.setting";

export const info_log = () => {
  const sum = 77;
  const left = 4;
  const getStr = (text: string) => {
    const startNum = parseInt((sum / 2 - text.length / 2).toString());
    const endNum = !!text ? sum - startNum + 1 : sum;
    let leftStr = "";
    let endStr = "";
    let str = "";
    for (let i = 0; i < endNum; i++) {
      if (i === 0) {
        leftStr += "*";
      }
      if (i === endNum - 1) {
        endStr += "*";
      }
      if (i < startNum || (i > text.length && i < endNum - 1)) {
        str += " ";
      }
      if (i === startNum) {
        str += text;
      }
    }
    let sp = "";
    for (let i = 0; i < left; i++) {
      sp = " " + sp;
    }
    return cyan(`\n${sp}` + leftStr) + green(str) + cyan(endStr);
  };
  const getTitle = () => {
    const title = " Developer Server In listen ";
    const startNum = parseInt((sum / 2 - title.length / 2).toString());
    const endNum = sum - startNum + 1;
    let leftStr = "";
    let endStr = "";
    for (let i = 0; i < endNum; i++) {
      if (i < startNum) {
        leftStr += "*";
      }
      if (i > title.length && i < endNum - 1) {
        endStr += "*";
      }
    }
    let sp = "";
    for (let i = 0; i < left; i++) {
      sp += " ";
    }
    return cyan(`\n${sp}*` + leftStr) + bold(blue(title)) + cyan(endStr + "*");
  };
  const getBottom = () => {
    const endNum = sum;
    let str = "";
    for (let i = 0; i < endNum + 1; i++) {
      str += "*";
    }
    for (let i = 0; i < left; i++) {
      str = " " + str;
    }
    return "\n" + str;
  };
  console.log(
    getTitle(),
    cyan(getStr("")),
    cyan(getStr("")),
    cyan(getStr("")),
    green(
      getStr(
        `IP: http://${AppSetting.LOCAL_IP}:${AppSetting.port}           Local: http://${AppSetting.host}:${AppSetting.port} `
      )
    ),
    cyan(getStr("")),
    cyan(getBottom()),
    green("\n")
  );
};
