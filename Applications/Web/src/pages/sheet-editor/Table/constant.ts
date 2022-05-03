import { ColunmProps, MetaType, MetaOption, SheetRecordValue } from "../type";

export class Colunm {
  constructor(props: ColunmProps) {
    const { title, type, width, code, meta, id, left } = props;
    this.id = id;
    this.title = title;
    this.code = code;
    this.type = type;
    if (typeof width === "number") {
      this.width = width;
    }
    this.left = left;
    if (meta) {
      this.meta = meta;
    }
  }
  left: number;
  id: string;
  meta: MetaOption = {
    Text: {},
    Number: {
      decimal: "auto",
      unit: "none",
    },
    Percent: {
      decimal: "auto",
    },
    Boolean: {},
    Date: {
      format: "YYYY-MM-DD HH:mm:ss",
    },
    QrCode: {
      type: "PIC",
      size: 100,
    },
    Options: [],
    File: {},
  };
  code: string;
  width = 180;
  type: MetaType = "Text";
  title = "";

  getValue(text: SheetRecordValue): SheetRecordValue {
    switch (this.type) {
      case "Boolean":
        return text.toString();
      case "QrCode": {
        if (typeof text === "string") {
          try {
            return JSON.parse(text);
          } catch (_) {
            return {
              value: "",
              title: "",
            };
          }
        } else {
          return {
            value: "",
            title: "",
          };
        }
      }
      case "File": {
        if (typeof text === "string") {
          try {
            return JSON.parse(text);
          } catch (_) {
            return {
              url: "",
              filename: "",
              type: "",
            };
          }
        } else {
          return {
            url: "",
            filename: "",
            type: "",
          };
        }
      }
      default:
        return text;
    }
  }

  getLabel(text: SheetRecordValue) {
    switch (this.type) {
      case "Boolean":
        return text;
      case "QrCode": {
        if (typeof text === "string") {
          try {
            const { title } = JSON.parse(text);
            return title;
          } catch (_) {
            return "";
          }
        } else {
          return "";
        }
      }
      case "File": {
        if (typeof text === "string") {
          try {
            const { filename, type } = JSON.parse(text);
            return `${filename}.${type}`;
          } catch (_) {
            return "";
          }
        } else {
          return "";
        }
      }
      default:
        return text;
    }
  }
  setMeta(key: MetaType, payload: any) {
    this.meta[key] = payload;
  }
}
