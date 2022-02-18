/*
 * Created by zhangq on 2022/02/17
 * 序号 显示
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "../../style.scss";

/**
 * @interface props
 */
export interface IndexColProps {
  rows: any[];
}
const IndexCol: FC<IndexColProps> = ({ rows }: IndexColProps): ReactElement => {
  /** state */
  const [tep, setTep] = useState<string>("");

  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */
  const init = () => {};

  /** render */
  return (
    <div className={className["table-li-index"]}>
      <div className={className["table-li-index-header"]} />
      {rows.map((_, i) => {
        return (
          <div key={"index-" + i} className={className["table-li-index-cell"]}>
            {i}
          </div>
        );
      })}
      <div className={className["drop-line"]}></div>
    </div>
  );
};

export default IndexCol;
