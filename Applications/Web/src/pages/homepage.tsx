import { ReactElement, FC } from "react";
import { useGlobalContext } from "@/GlobalContext";
import { TansformText } from "@/locales";

const pageKey = "homepage";
const HomePage: FC = (): ReactElement => {
  const themeStyle = useGlobalContext().themes[pageKey]; // 主题样式
  return (
    <div className={themeStyle[`page`]}>
      <TansformText
        textKey={`page-title`}
        module={pageKey}
        style={{ color: "red" }}
      ></TansformText>
    </div>
  );
};

export default HomePage;
