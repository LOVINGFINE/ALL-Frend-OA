import "./global.css";
import "../static/style/iconfont.css";

import type { AppProps } from "next/app";
import ManageLayout from "../layouts/ManageLayout";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ManageLayout>
      <Component {...pageProps}></Component>
    </ManageLayout>
  );
}

export default MyApp;
