/*
 * Created by zhangq on 2021/05/20
 * layout
 */

import { ReactElement, FC } from "react";
import { RouteItem } from "dyl-plugins";
import className from "../style.scss";
import PageHeader from "@/components/PageHeader";
import { homeLogo } from "@/assets";
import AppConfig from "@/app.setting";
import { useNavigate } from "react-router-dom";

const BasicLayout: FC<BasicLayoutProps> = ({
  children,
}: BasicLayoutProps): ReactElement => {
  /** render */
  return (
    <div className={className["basicLayout"]}>
      <PageHeader logo={homeLogo} title={AppConfig.websiteName} />
      <div className={className["basicLayout-contanier"]}>{children}</div>
    </div>
  );
};

export interface BasicLayoutProps extends RouteItem {
  children?: React.ReactElement;
}

export default BasicLayout;
