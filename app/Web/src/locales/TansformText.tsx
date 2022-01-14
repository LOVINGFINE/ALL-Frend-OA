import { ReactElement, FC } from "react";
import { useGlobalContext } from "@/GlobalContext";

export interface TansformTextProps {
  children?: ReactElement | string;
  module?: string;
  textKey: string;
  style?: React.CSSProperties;
}

export const TansformText: FC<TansformTextProps> = ({
  module = "",
  textKey,
  style = {},
}: TansformTextProps): React.ReactElement => {
  const localeMaps = useGlobalContext()["locales"][module] || {};
  return <span style={style}>{localeMaps[textKey] || ""}</span>;
};
