import { ReactElement, FC } from "react";
import { Button } from "@/components";
import { useGlobalContext } from "@/GlobalContext";

const pageKey = "homepage";
const HomePage: FC = (): ReactElement => {
  const themeStyle = useGlobalContext().themes[pageKey]; // 主题样式
  return (
    <div className={themeStyle[`page`]}>
      <Button>aaaa</Button>
    </div>
  );
};

export default HomePage;
