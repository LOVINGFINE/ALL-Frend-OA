import { createContext, useContext, useEffect, useReducer } from "react";
import globalContext from "../global";
import esUS from "./es-US";
import zhCN from "./zh-CN";

export type LocaleKey = "zh-cn" | "es-us";

export interface localeDataSourceType {
  [key: string]: string;
}

interface StateProps {
  maps: localeDataSourceType;
}

export const LocaleContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const global = useContext(globalContext);
  const reducer = (
    state: StateProps,
    { type, payload }: { type: string; payload: localeDataSourceType }
  ) => {
    if (type === "Update") {
      state["maps"] = payload;
    }
    return state;
  };
  const [state, actions] = useReducer(reducer, {
    maps: zhCN,
  });
  useEffect(() => {
    let payload = zhCN;
    if (global.locale === "es-us") {
      payload = esUS;
    }
    actions({ type: "Update", payload });
  }, [global.locale]);

  return <context.Provider value={state}>{children}</context.Provider>;
};

const context = createContext({
  maps: zhCN,
});

export * from "./TansformText";

export default context;
