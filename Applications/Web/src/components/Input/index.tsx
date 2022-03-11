/*
 * Created by zhangq on 2022/02/01
 * input 输入框
 */
import { ReactElement, FC, CSSProperties } from "react";
import "./input.scss";

/**
 * @interface props
 */
export interface InputProps {
  value?: string | number;
  change?(e: any): void;
  size?: "default" | "small" | "large";
  perfix?: string;
  placeholder?: string;
  width?: number;
  style?: CSSProperties;
}
const Input: FC<InputProps> = ({
  value = "",
  size = "default",
  change,
  perfix = "dyl",
  placeholder,
  width,
  style = {},
}: InputProps): ReactElement => {
  const getStyle = () => {
    const obj = {
      ...style,
    };
    if (width) {
      obj["width"] = width;
    }
    return obj;
  };
  /** render */
  return (
    <input
      type={"text"}
      className={`${perfix}-input ${perfix}-input-${size}`}
      placeholder={placeholder}
      style={getStyle()}
      value={value}
      onChange={(e) => {
        const input = e.target.value || "";
        if (change) {
          change(input);
        }
      }}
    />
  );
};

export default Input;
