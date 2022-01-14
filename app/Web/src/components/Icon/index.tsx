import config from "./config";
import "./icon.scss";
const Icon = ({
  fontSize = 16,
  color = "#333",
  type = "not-found",
}: {
  fontSize?: number;
  color?: string;
  type?: string;
}): React.ReactElement => {
  return (
    <span
      style={{
        fontFamily: "icon_font",
        fontSize,
        color,
      }}
    >
      {config[type]}
    </span>
  );
};

export default Icon;
