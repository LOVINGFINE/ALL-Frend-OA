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
  prefix = "dyl",
}: ButtonProps): ReactElement => {
  const classNames = [
    "button",
    `button-${type || "default"}`,
    `button-${size || "middle"}`,
    `${!!disabled ? "button-disabled" : ""}`,
  ]
    .filter((ele) => !!ele)
    .map((ele) => {
      return `${prefix}-${ele}`;
    });
  /** render */
  return (
    <div onClick={onClick} className={classNames.join(" ")} style={style}>
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
  prefix?: string;
}
export default Button;
