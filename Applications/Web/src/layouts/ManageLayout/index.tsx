/*
 * Created by zhangq on 2021/05/20
 * layout
 */

import { ReactElement, useEffect, FC } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { RouteItem } from "dyl-plugins";
import { ManageLayoutProps } from "../type";
import className from "../style.scss";
import PageHeader from "@/layouts/page-header";
import ManageMenu from "./menu";
import { imgFaviconIco } from "@/assets";
import AppConfig from "@/app.config";

const ManageLayout: FC<ManageLayoutProps> = ({
  routes = [],
  path,
  children,
  redirect,
}: ManageLayoutProps): ReactElement => {
  const navigate = useNavigate();
  const match = useMatch(path || "");
  useEffect(() => {
    if (path && match && redirect && path !== redirect) {
      navigate(redirect);
    }
  }, []);

  /**
   * @method
   */
  const getRoutes = (list: RouteItem[]): RouteItem[] => {
    return list.map((ele) => {
      return {
        ...ele,
        rooutes: ele.routes
          ? ele.routes.map((item) => ({
              ...item,
              path: (ele.path || "*") + item.path,
            }))
          : undefined,
      };
    });
  };
  /** render */
  return (
    <div className={className["manageLayout"]}>
      <PageHeader logo={imgFaviconIco} title={AppConfig.websiteName} />
      <div className={className["manageLayout-main"]}>
        <ManageMenu
          routes={getRoutes(
            routes.map((item) => ({
              ...item,
              path: (path || "") + item.path,
            }))
          )}
          basePath={path || ""}
        />
        <div className={className["manageLayout-right"]}>
          <div className={className["manageLayout-right-card"]}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ManageLayout;
