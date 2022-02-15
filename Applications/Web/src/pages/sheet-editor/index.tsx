/*
 * Created by zhangq on 2022/02/14
 * 表格编辑器
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "./style.scss";

const SheetEditor: FC = (): ReactElement => {
  /** state */
  const [tep, setTep] = useState<string>("");

  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */

  /** render */
  return <div className={className["page"]}></div>;
};

export default SheetEditor;
