export type ColumnType =
  | "Text"
  | "Number"
  | "Boolean"
  | "Qrcode"
  | "Options"
  | "File";

export interface ColunmProps {
  title?: string;
  type?: ColumnType;
  width?: number;
  index: number;
  code?: number | string;
}

export interface ColunmOptionItem {
  label: string;
  value: string | number;
}

export const getCodeByNumber = (index: number): string => {
  let num = index + 1;
  let target = "";
  while (num > 0) {
    let m = num % 26;
    if (m === 0) {
      m = 26;
    }
    target = String.fromCharCode(m + 64) + target;
    num = (num - m) / 26;
  }
  return target;
};
export class Colunm {
  constructor(props: ColunmProps) {
    const { title, type, width, index, code } = props;
    this.title = title || index.toString();
    this.code = code || getCodeByNumber(index);
    if (type) {
      this.type = type;
    }
    if (width) {
      this.width = width;
    }
  }

  index = 0;
  code: number | string;
  width = 180;

  options: ColunmOptionItem[] = [];

  type: ColumnType = "Text";

  title;

  getValue(value: string): string | boolean | number {
    switch (this.type) {
      case "Boolean":
        return !!value;
      case "Number": {
        if (typeof value === "string") {
          return parseFloat(value);
        } else {
          return value;
        }
      }
      case "Options":
        return value;
      case "Qrcode":
        return value;
      default:
        return value;
    }
  }

  change(key: string, data: any) {
    if (key === "width") {
      this.width = data;
    }
  }
  setOptions(options: any[]) {
    this.options = options.map((ele) => {
      return {
        label: ele?.label || ele?.value || "",
        value: ele?.value || "",
      };
    });
  }
}
