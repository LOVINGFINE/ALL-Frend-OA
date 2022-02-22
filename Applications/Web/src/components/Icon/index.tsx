import { FC, ReactElement } from "react";
import unicodes from "@/assets/fonts/font-unicode.json";
import "@/assets/fonts/font-face.scss";
import "./icon.scss";

export interface IconProps {
  fontSize?: number;
  color?: string;
  name?: string;
  prefix?: string;
}

const Icon: FC<IconProps> = ({
  fontSize = 14,
  color = "var(--font-color-base)",
  name,
  prefix = "dyl",
}: IconProps): ReactElement => {
  const types = unicodes as any;
  return (
    <i
      className={`${prefix}-icon-font`}
      style={{
        width: 14,
        fontSize,
        color,
      }}
    >
      {types[name || ""] || ""}
    </i>
  );
};

export default Icon;
