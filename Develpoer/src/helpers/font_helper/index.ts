import svgToFont from "svgtofont";
import document from "./unicode.json";
import { AppStatus } from "../../app.setting";
class FontHelper {
  document: { [key: string]: any } = document;
  constructor() {}

  write(): Promise<AppStatus> {
    const { document } = this;
    return Promise.resolve(AppStatus.OK);
  }

  create(file: File) {
    const { document } = this;
  }
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

export default FontHelper;
