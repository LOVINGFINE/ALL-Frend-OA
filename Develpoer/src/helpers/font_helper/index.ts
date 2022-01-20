import svgToFont from "svgtofont";
import { resolve } from "path";
import document from "./unicode.json";
import { AppStatus } from "../../app.setting";
import fs from "fs";

export class FontHelper {
  document: { [key: string]: any } = document;
  fontName = "all-frend-oa-font";
  constructor() {}

  async write() {
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
          output: "src/helpers/font_helper/.dev/styles",
        },
      });
      const files = fs.readdirSync(resolve(__dirname, ".dev/font"));
      files.forEach((file) => {
        const outs = [`${fontName}.svg`, `${fontName}.symbol.svg`];
        if (outs.includes(file)) {
          fs.unlinkSync(resolve(__dirname, ".dev/font/" + file));
        }
      });
      const styles = fs.readdirSync(resolve(__dirname, ".dev/styles"));
      styles.forEach((file) => {
        if (file === `${fontName}.styl`) {
          fs.unlinkSync(resolve(__dirname, ".dev/styles/" + file));
        }
      });
      return AppStatus.OK;
    } catch (e) {
      console.log(e);
      return AppStatus.ERROR;
    }
  }

  create(file: File) {}
  update() {}

  async delete(key: string) {
    const { document } = this;
    if (!!document[key]) {
      document.delete(key);
      const status = await this.write();
      return status;
    } else {
      return AppStatus.ERROR;
    }
  }

  get(key?: string) {
    const { document } = this;
    if (key) {
      return document["key"];
    } else {
      return document.map((ele: any, key: string) => {
        return {
          ...ele,
          key,
        };
      });
    }
  }
}
