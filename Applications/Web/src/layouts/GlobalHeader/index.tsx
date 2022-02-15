/*
 * Created by zhangq on 2021/05/20
 * style
 */
import { ReactElement, useEffect } from "react";
import className from "./header.scss";
import { imgFaviconIco } from "@/assets";
const GlobalHeader = ({ style }: GlobalHeaderPorops): ReactElement => {
  const basic = `dyl-global-header`;
  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */

  /** render */
  return (
    <div className={className[basic]} style={style}>
      <div className={className[`${basic}-left`]}>
        <div className={className[`${basic}-left-logo`]}>
          <img src={imgFaviconIco} alt="" />
        </div>
      </div>
      <div className={className[`${basic}-right`]}></div>
    </div>
  );
};

export interface GlobalHeaderPorops {
  logo?: string | ReactElement;
  style?: React.CSSProperties;
}

export default GlobalHeader;
