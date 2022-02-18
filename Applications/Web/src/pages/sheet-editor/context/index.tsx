import { createContext, useReducer, useEffect } from "react";
import contextState, { StateProps } from "./state";
import { getInitState } from "../utils/";

const editorContext = createContext(contextState);

export const EditorContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const reducer = (
    state: StateProps,
    { type, payload }: { type: string; payload: unknown }
  ) => {
    if (typeof state[type] !== "undefined") {
      state[type] = payload;
    }
    return state;
  };
  const [state, actions] = useReducer(reducer, {
    ...contextState,
    ...getInitState(),
  });
  const dispatch = (key: string, data: unknown) => {
    actions({ type: key, payload: data });
  };
  useEffect(() => {}, []);
  return (
    <editorContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </editorContext.Provider>
  );
};

export default editorContext;
