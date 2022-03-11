/*
 * Created by zhangq on 2021/11/26
 * 抽屉组件
 */
import { ReactElement, FC, ReactNode, useEffect, useState } from "react";
import "./modal.scss";
import ReactDOM from "react-dom";
import { Icon } from "@/components";

const Render = ({
  children,
  visible = false,
  width = 425,
  height = 550,
  zIndex = 1000,
  close = true,
  maskClose = true,
  mask = true,
  onClose,
  prefix = "dyl",
  footer,
  placement = "bottom-left",
}: ModalProps) => {
  const renderFooter = () => {
    if (footer === null) {
      return <></>;
    }
    if (footer) {
      return footer;
    }
    return <div className={`${prefix}-modal-footer`}></div>;
  };
  const renderClose = () => {
    if (typeof close === "boolean") {
      return close ? (
        <div
          className={`${prefix}-modal-close`}
          onClick={() => {
            if (maskClose && onClose) {
              onClose();
            }
          }}
        >
          <Icon name={"cross"} fontSize={20} color={"var(--font-color-sec)"} />
        </div>
      ) : (
        <></>
      );
    }
    if (typeof close === "function") return close;
  };
  const bodyStyle = () => {
    const over = -15;
    const x = `calc(100vw / 2 - ${width / 2}px)`;
    const y = `calc(100vh / 2 - ${height / 2}px)`;
    const w = visible ? width : 0;
    const h = visible ? height : 0;
    switch (placement) {
      case "bottom-left":
        return {
          left: visible ? x : over,
          bottom: visible ? y : over,
          width: w,
          height: h,
        };
      case "bottom-right":
        return {
          right: visible ? x : over,
          bottom: visible ? y : over,
          width: w,
          height: h,
        };
      case "top-right":
        return {
          right: visible ? x : over,
          top: visible ? y : over,
          width: w,
          height: h,
        };
      case "top-left":
        return {
          left: visible ? x : over,
          top: visible ? y : over,
          width: w,
          height: h,
        };
      case "bottom":
        return {
          left: x,
          bottom: visible ? y : over,
          width,
          height: h,
        };
      case "top":
        return {
          left: x,
          top: visible ? y : over,
          width,
          height: h,
        };
      case "left":
        return {
          top: y,
          left: visible ? x : over,
          width: w,
          height,
        };
      case "right":
        return {
          top: y,
          right: visible ? x : over,
          width: w,
          height,
        };
    }
  };
  return (
    <div className={`${prefix}-modal`} style={{ zIndex }}>
      {mask && visible && (
        <div
          className={`${prefix}-modal-mask`}
          onClick={() => {
            if (maskClose && onClose) {
              onClose();
            }
          }}
        />
      )}
      <div className={`${prefix}-modal-content`} style={bodyStyle()}>
        {renderClose()}
        <div className={`${prefix}-modal-body`}>{children}</div>
        {renderFooter()}
      </div>
    </div>
  );
};
const Modal: FC<ModalProps> = (props: ModalProps): ReactElement => {
  const prefix = props.prefix || "dyl";
  const [currentId] = useState(`${prefix}-modal-${new Date().getTime()}`);
  useEffect(() => {
    const div = document.createElement("div");
    div.id = currentId;
    ReactDOM.render(<Render {...props} />, div);
    document.body.appendChild(div);
  }, []);

  useEffect(() => {
    const div = document.getElementById(currentId);
    if (div) {
      ReactDOM.render(<Render {...props} />, div);
    }
  }, [props]);

  /** render */
  return <></>;
};
export interface ModalProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  center?: boolean;
  footer?: null | ReactElement;
  visible?: boolean;
  zIndex?: number;
  width?: number;
  height?: number;
  close?: boolean | ReactNode;
  onClose?(): void;
  maskClose?: boolean;
  mask?: boolean;
  prefix?: string;
  placement?:
    | "left"
    | "top"
    | "right"
    | "bottom"
    | "bottom-right"
    | "bottom-left"
    | "top-left"
    | "top-right";
}
export default Modal;
