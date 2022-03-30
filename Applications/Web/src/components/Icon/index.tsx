import { FC, ReactElement } from "react";
import unicodes from "@/assets/fonts/font-unicode.json";
import "@/assets/fonts/font-face.scss";
import "./icon.scss";

export interface IconProps {
  fontSize?: number;
  color?: string;
  name?: string;
  className?: string;
  prefix?: string;
  onClick?(e: MouseEvent): void;
}

const Icon: FC<IconProps> = ({
  fontSize,
  color,
  name,
  className,
  onClick,
  prefix = "dyl",
}: IconProps): ReactElement => {
  const types = unicodes as any;
  const getStyle = () => {
    const temp: any = {};
    if (fontSize) {
      temp[""] = fontSize;
    }
    if (color) {
      temp["color"] = color;
    }
    return temp;
  };
  const getClassName = () => {
    if (className) {
      return `${prefix}-icon-font ${className}`;
    }
    return `${prefix}-icon-font`;
  };
  return (
    <i
      className={getClassName()}
      onClick={(e: any) => {
        if (onClick) {
          onClick(e);
        }
      }}
      style={getStyle()}
    >
      {types[name || ""] || ""}
    </i>
  );
};

export default Icon;
