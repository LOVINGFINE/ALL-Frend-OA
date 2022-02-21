import { createContext, useEffect, useReducer } from "react";
import initGlobal from "./state";
import { LocaleKey } from "@/locales";
import { ThemeType } from "@/theme";
export interface ProviderType extends StateProps {
  dispatch<T>(key: string, data: T): void;
}

export interface StateProps {
  [key: string]: unknown;
  theme: ThemeType;
  locale: LocaleKey;
  prefix: string;
}
const context = createContext(initGlobal);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const dynmicImport = (name: string) => {
    import(`../theme/lib/${name}.css`);
  };
  const reducer = (
    state: StateProps,
    { type, payload }: { type: string; payload: any }
  ) => {
    if (typeof state[type] !== undefined) {
      state[type] = payload;
      if (type === "theme") {
        dynmicImport(payload);
      }
    }
    return state;
  };
  const [state, actions] = useReducer(reducer, initGlobal);
  const dispatch = (key: string, data: any) => {
    actions({ type: key, payload: data });
  };
  useEffect(() => {
    dynmicImport("white");
  }, []);
  return (
    <context.Provider value={{ ...state, dispatch }}>
      {children}
    </context.Provider>
  );
};

export default context;
