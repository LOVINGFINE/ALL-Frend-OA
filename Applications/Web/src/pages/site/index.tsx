/*
 * Created by zhangq on 2021/11/18
 *
 */
import { ReactElement, useEffect } from "react";
import className from "./site.scss";

const SitePage = (): ReactElement => {
  /** state */

  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */

  /** render */
  return <div className={className["page-content"]}>设置</div>;
};

export default SitePage;
