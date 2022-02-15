/*
 * Created by zhangq on 2021/05/20
 * layout
 */

import { ReactElement, FC } from "react";
import { BasicLayoutProps } from "./type";
import className from "./style.scss";
import GlobalHeader from "@/layouts/GlobalHeader";

const BasicLayout: FC<BasicLayoutProps> = ({
  children,
}: BasicLayoutProps): ReactElement => {
  /** render */
  return (
    <div className={className["basicLayout-page"]}>
      <GlobalHeader />
      <div className={className["basicLayout-contanier"]}>{children}</div>
    </div>
  );
};

export default BasicLayout;
