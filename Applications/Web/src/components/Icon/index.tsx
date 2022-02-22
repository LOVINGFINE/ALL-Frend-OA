import unicodes from "@/assets/fonts/font-unicode.json";
import "@/assets/fonts/font-face.scss";

const Icon = ({
  fontSize = 14,
  color = "var(--font-color-base)",
  name,
  prefix = "dyl",
}: {
  fontSize?: number;
  color?: string;
  name?: string;
  prefix?: string;
}): React.ReactElement => {
  const types = unicodes as any;
  return (
    <i
      className={`${prefix}-icon-font`}
      style={{
        fontSize,
        color,
      }}
    >
      {types[name || ""] || ""}
    </i>
  );
};

export default Icon;
