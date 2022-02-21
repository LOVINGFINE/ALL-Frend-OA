/*
 * Created by zhangq on 2021/11/26
 * 抽屉组件
 */
import { ReactElement, FC, ReactNode, useEffect, useState } from "react";
import "./modal.scss";
import ReactDOM from "react-dom";

const Render = ({
  children,
  visible = false,
  width = 400,
  height = 550,
  zIndex = 1000,
  close = true,
  maskClose = true,
  mask = true,
  onClose,
  prefix = "dyl",
  footer,
}: ModalProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };
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
        <div className={`${prefix}-modal-close`} onClick={handleClose}>
          <span>X</span>
        </div>
      ) : (
        <></>
      );
    }
    if (typeof close === "function") return close;
  };
  const bodyStyle = () => {
    return visible
      ? {
          width,
          height,
          left: `calc(100vw / 2 - ${width / 2}px)`,
          bottom: `calc(100vh / 2 - ${height / 2}px)`,
        }
      : {
          width: 0,
          height: 0,
          left: 0,
          bottom: 0,
        };
  };
  return (
    <div className={`${prefix}-modal`} style={{ zIndex }}>
      {mask && visible && (
        <div
          className={`${prefix}-modal-mask`}
          onClick={() => {
            if (maskClose) {
              handleClose();
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
}
export default Modal;
