export interface Sheet {
  id: string;
  code: string;
  name: string;
  createTime: string;
  updateTime: string;
  columns: SheetHeader[];
}

export type MetaType =
  | "Text"
  | "Number"
  | "Percent"
  | "Boolean"
  | "Date"
  | "QrCode"
  | "Options"
  | "File";

export interface MetaOption {
  Text: any;
  Number: {
    decimal: "auto" | number;
    unit: "none";
  };
  Percent?: {
    decimal: "auto" | number;
  };
  Boolean: any;
  Date: {
    format: "YYYY-MM-DD HH:mm:ss";
  };
  QrCode: {
    type: "PIC" | "TITLE_PIC";
    size: number;
  };
  Options: { value: string; color: string }[];
  File: any;
}

export interface SheetHeader {
  id: string;
  code: string;
  title: string;
  width: number;
  formula: {
    value: string;
    html: string;
  };
  type: MetaType;
  meta?: MetaOption;
}

export type SheetRecordValue = string | number | boolean;

export interface SheetEntry {
  id: string;
  record: {
    [key: string]: SheetRecordValue;
  };
}

export interface ColunmProps extends SheetHeader {
  left: number;
}
