import { FC, useContext } from "react";
import context from "./index";

export interface TansformTextProps {
  name?: string;
}

export const TansformText: FC<TansformTextProps> = ({
  name,
}: TansformTextProps): React.ReactElement => {
  const text = useContext(context).maps[name || "not-found"];
  return <>{text}</>;
};
