/*
 * Created by zhangq on 2021/11/26
 * message 组件
 */
import "./message.scss";
import ReactDOM from "react-dom";
import { Icon } from "@/components";

export interface MessageSuccessProps {
  zIndex?: number;
  prefix?: string;
  duration?: number;
}

export interface MessageRenderProps {
  prefix?: string;
  title?: string;
  type: "success";
  duration?: number;
}

const setTop = (name: string) => {
  const body = document.getElementsByTagName("body")[0];
  const arr: any[] = [];
  (body?.childNodes || []).forEach((ele: any, i) => {
    const className = ele?.className || "";
    if (!!className && className.indexOf(name) !== -1) {
      arr.push(ele);
    }
  });
  arr.forEach((ele, i) => {
    ele.style.top = `${i * 55 + 15}px`;
  });
  return (arr.length - 1) * 55 + 15;
};

export default class Message {
  static success(title: string, options?: MessageSuccessProps) {
    Message.render({ title, type: "success", duration: options?.duration });
  }

  static render({
    title,
    prefix = "dyl",
    type,
    duration = 2500,
  }: MessageRenderProps) {
    const div = document.createElement("div");
    div.className = `${prefix}-message`;
    const content = (
      <div className={`${prefix}-message-render ${prefix}-message-${type}`}>
        <Icon name={"info-with-circle"} color={"var(--font-color-success)"} />
        <span className={`${prefix}-message-render-title`}>{title || ""}</span>
      </div>
    );
    ReactDOM.render(content, div);
    document.body.appendChild(div);
    setTop(`${prefix}-message`);
    setTimeout(() => {
      document.body.removeChild(div);
      setTop(`${prefix}-message`);
    }, duration);
  }
}
