/*
 * Created by zhangq on 2021/11/26
 *
 */
import { ReactElement, FC, MouseEvent } from "react";
import "./button.scss";
const Button: FC<ButtonProps> = ({
  children,
  type,
  size,
  onClick,
  style,
  disabled,
}: ButtonProps): ReactElement => {
  /** render */
  const mainClassName = `dyl-button dyl-button-${
    type || "default"
  } dyl-button-${size || "middle"} ${!!disabled ? "dyl-button-disabled" : ""}`;
  return (
    <div onClick={onClick} className={mainClassName} style={style}>
      {children}
    </div>
  );
};
export interface ButtonProps {
  children?: React.ReactElement | React.ReactElement[] | string;
  type?: "default" | "error" | "primary";
  size?: "middle" | "small" | "large";
  style?: React.CSSProperties;
  onClick?(e: MouseEvent): void;
  disabled?: boolean;
}
export default Button;
