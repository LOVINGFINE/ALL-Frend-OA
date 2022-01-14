import { ReactElement } from "react";
// import {} from '@/assets'

const source: Array<emptyConfigItem> = [
  {
    type: "notFind",
    icon: '',
    title: "找不到页面",
  },
];

export interface emptyConfigItem {
  type: string;
  icon: unknown;
  title: string;
  text?: string[];
  bottom?: ReactElement;
}
export default source;
