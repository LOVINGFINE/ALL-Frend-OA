import esUS from "./es-US";
import zhCN from "./zh-CN";

export type LocaleKey = "zh-cn" | "es-us";

export interface localeDataSourceType {
  [key: string]: { [key: string]: string | number };
}

export const localeProvider = (key: LocaleKey) => {
  switch (key) {
    case "zh-cn":
      return zhCN;
    case "es-us":
      return esUS;
    default:
      return zhCN;
  }
};

export * from "./TansformText";

export default localeProvider;
