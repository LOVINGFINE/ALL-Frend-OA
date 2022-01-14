/*
 * Created by zhangq on 2021/05/20
 * layout
 */

import { ReactElement, useEffect, FC } from "react";
import { RouteItem } from "dyl-plugins";
import { BasicLayoutProps } from "./type";
import className from "./style.scss";
import GlobalHeader from "@/components/GlobalHeader";
import BasicMenu from "./BasicMenu";

const BasicLayout: FC<BasicLayoutProps> = ({
  routes,
  path,
  children,
}: BasicLayoutProps): ReactElement => {
  /** LifeCycle */
  useEffect(() => {
    // init
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
    <div className={className["basicLayout-contanier"]}>
      <GlobalHeader />
      <div className={className["basicLayout-contanier-main"]}>
        <BasicMenu
          routes={getRoutes(
            routes.map((item) => ({
              ...item,
              path: (path || "") + item.path,
            }))
          )}
          basePath={path || ""}
        />
        <div className={className["basicLayout-contanier-right"]}>
          <div className={className["basicLayout-contanier-right-card"]}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
