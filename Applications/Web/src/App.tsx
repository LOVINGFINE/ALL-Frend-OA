/*
 * Created by zhangq on 2021/07/01
 * app
 */
import { ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";
import { DynamicRouteProvider } from "dyl-plugins";
import { GlobalContextProvider } from "@/global";
import { LocaleContextProvider } from "./locales";

import routes from "./app.router";
const App = (): ReactElement => {
  /** render */
  return (
    <GlobalContextProvider>
      <LocaleContextProvider>
        <BrowserRouter>
          <DynamicRouteProvider routes={routes} />
        </BrowserRouter>
      </LocaleContextProvider>
    </GlobalContextProvider>
  );
};

export default App;
