/*
 * Created by zhangq on 2021/05/20
 * layout
 */

import { ReactElement, FC } from "react";
import { BasicLayoutProps } from "../type";
import className from "../style.scss";
import LayoutPageHeader from "@/layouts/LayoutPageHeader";
import { imgFaviconIco } from "@/assets";
import AppConfig from "@/app.config";

const BasicLayout: FC<BasicLayoutProps> = ({
  children,
}: BasicLayoutProps): ReactElement => {
  /** render */
  return (
    <div className={className["basicLayout"]}>
      <LayoutPageHeader logo={imgFaviconIco} title={AppConfig.websiteName} />
      <div className={className["basicLayout-contanier"]}>{children}</div>
    </div>
  );
};

export default BasicLayout;
