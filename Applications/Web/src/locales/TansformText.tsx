import { ReactElement, FC } from "react";
import { useGlobalContext } from "@/GlobalContext";

export interface TansformTextProps {
  module?: string;
  textKey: string;
}

export const TansformText: FC<TansformTextProps> = ({
  module = "",
  textKey,
}: TansformTextProps): React.ReactElement => {
  const localeMaps = useGlobalContext()["locales"][module] || {};
  return <>{localeMaps[textKey] || ""}</>;
};
