import { createContext, useReducer } from "react";
import initGlobal from "./state";
import themeProvider, { ThemeType } from "@/theme";
import localeProvider, { LocaleKey } from "@/locales";

export interface ProviderType extends StateProps {
  dispatch<T>(key: string, data: T): void;
}

export interface StateProps {
  [key: string]: any;
  theme: ThemeType;
  locale: LocaleKey;
}

export const useGlobalContext = () => {
  const reducer = (
    state: StateProps,
    { type, payload }: { type: string; payload: unknown }
  ) => {
    if (initGlobal[type]) {
      return {
        ...state,
        [type]: payload,
      };
    } else {
      throw new Error();
    }
  };
  const [state, actions] = useReducer(reducer, initGlobal);
  const dispatch = (key: string, data: unknown) => {
    actions({ type: key, payload: data });
  };

  return {
    ...state,
    themes: themeProvider(state.theme),
    locales: localeProvider(state.locale),
    dispatch,
  };
};

const { Provider } = createContext(initGlobal);

export default Provider;
