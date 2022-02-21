/*
 * Created by zhangq on 2021/11/26
 * 抽屉组件
 */
import { ReactElement, FC, ReactNode, useEffect, useState } from "react";
import "./drawer.scss";
import ReactDOM from "react-dom";

const Render = ({
  placement = "left",
  children,
  visible = false,
  style = {},
  width = 375,
  zIndex = 1001,
  close = true,
  maskClose = true,
  mask = true,
  onClose,
  prefix = "dyl",
}: DrawerProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
  const renderClose = () => {
    if (typeof close === "boolean") {
      return close ? (
        <div className={`${prefix}-drawer-close`} onClick={handleClose}>
          <span>X</span>
        </div>
      ) : (
        <></>
      );
    }
    if (typeof close === "function") return close;
  };
  const bodyStyle = () => {
    const show = visible ? width : 0;
    if (placement === "left") {
      return { ...style, width: show, height: "100vh", top: 0, left: 0 };
    }
    if (placement === "right") {
      return { ...style, width: show, height: "100vh", top: 0, right: 0 };
    }
    if (placement === "bottom") {
      return { ...style, height: show, width: "100vw", bottom: 0, left: 0 };
    }
    if (placement === "top") {
      return { ...style, height: show, width: "100vw", top: 0, left: 0 };
    }
  };
  return (
    <div className={`${prefix}-drawer`} style={{ zIndex }}>
      {mask && visible && (
        <div
          className={`${prefix}-drawer-mask`}
          onClick={() => {
            if (maskClose) {
              handleClose();
            }
          }}
        />
      )}
      <div className={`${prefix}-drawer-body`} style={bodyStyle()}>
        {renderClose()}
        {children}
      </div>
    </div>
  );
};
const Drawer: FC<DrawerProps> = (props: DrawerProps): ReactElement => {
  const prefix = props.prefix || "dyl";
  const [currentId] = useState(`${prefix}-drawer-${new Date().getTime()}`);
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
export interface DrawerProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  placement?: "left" | "top" | "right" | "bottom";
  style?: React.CSSProperties;
  visible?: boolean;
  zIndex?: number;
  width?: number;
  height?: number;
  close?: boolean | ReactNode;
  onClose?(): void;
  maskClose?: boolean;
  mask?: boolean;
  prefix?: string;
}
export default Drawer;
