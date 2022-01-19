/*
 * Created by zhangq on 2021/05/20
 * style
 */
import { ReactElement, useEffect } from "react";
import "./header.scss";

const GlobalHeader = ({ style }: GlobalHeaderPorops): ReactElement => {
  const boxClassName = `dyl-global-header`;
  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */

  /** render */
  return (
    <div className={boxClassName} style={style}>
      <div className="dyl-global-header-left"></div>
      <div className="dyl-global-header-right"></div>
    </div>
  );
};

export interface GlobalHeaderPorops {
  logo?: string | ReactElement;
  style?: React.CSSProperties;
}

export default GlobalHeader;
