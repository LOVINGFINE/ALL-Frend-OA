export interface Sheet {
  id: string;
  code: string;
  name: string;
  createTime: string;
  updateTime: string;
  columns: SheetColumn[];
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

export interface SheetColumn {
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

export type FileType = string;

export type SheetRecordValue =
  | string
  | number
  | boolean
  | {
      url: string;
      filename: string;
      type: FileType;
    }
  | {
      title: string;
      value: string;
    };

export interface SheetEntry {
  id: string;
  record: {
    [key: string]: SheetRecordValue;
  };
}

export interface SheetEntriesPayload {
  [k: string]: {
    [k: string]: string | number | boolean;
  };
}

export interface SheetColumnPayload {
  id: string;
  title?: string;
  type?: MetaType;
}

export interface SheetEntriesProp {
  total: number;
  page: number;
  pageSize: number;
  records: SheetEntry[];
}

export interface ColunmProps extends SheetColumn {
  left: number;
}
