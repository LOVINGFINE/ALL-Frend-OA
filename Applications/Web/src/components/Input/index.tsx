/*
 * Created by zhangq on 2022/02/01
 * input 输入框
 */
import { ReactElement, FC, useEffect, useState } from "react";
import "./input.less";

/**
 * @interface props
 */
export interface InputProps {
  value: string | number | undefined;
  change(e: any): void;
}
const Input: FC<InputProps> = ({ value, change }: InputProps): ReactElement => {
  /** render */
  return (
    <input
      className="dyl-input"
      value={value}
      onInput={({ nativeEvent }) => {
        change(nativeEvent);
      }}
    />
  );
};

export default Input;
