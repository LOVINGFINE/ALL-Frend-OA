/*
 * Created by zhangq on 2021/05/20
 * layout
 */

import { ReactElement, FC, useEffect } from "react";
import { BasicLayoutProps } from "../type";
import className from "../style.scss";
import { useNavigate, useMatch } from "react-router-dom";
import PageHeader from "@/layouts/page-header";
import { homeLogo } from "@/assets";
import AppConfig from "@/app.setting";

const BasicLayout: FC<BasicLayoutProps> = ({
  children,
  redirect,
  path,
}: BasicLayoutProps): ReactElement => {
  const navigate = useNavigate();
  const match = useMatch(path || "");
  useEffect(() => {
    if (path && match && redirect && path !== redirect) {
      navigate(redirect, { replace: true });
    }
  }, []);
  /** render */
  return (
    <div className={className["basicLayout"]}>
      <PageHeader logo={homeLogo} title={AppConfig.websiteName} />
      <div className={className["basicLayout-contanier"]}>{children}</div>
    </div>
  );
};

export default BasicLayout;
