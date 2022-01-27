import config from "./config";
import "./font-face.scss";
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
    <i
      className="icon-font"
      style={{
        fontSize,
        color,
      }}
    >
      {config[type]}
    </i>
  );
};

export default Icon;
