/*
 * Created by zhangq on 2021/07/01
 * app
 */
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { DynamicRouteProvider } from "dyl-plugins";
import GlobalContextProvider, {
  useGlobalContext,
  ProviderType,
} from "@/GlobalContext";
import routes from "./app.route";
const App = (): ReactElement => {
  /** state */
  const globalContext: ProviderType = useGlobalContext();
  /** render */
  return (
    <GlobalContextProvider value={globalContext}>
      <BrowserRouter>
        <DynamicRouteProvider routes={routes} />
      </BrowserRouter>
    </GlobalContextProvider>
  );
};

export default App;
