/*
 * Created by zhangq on 2022/02/17
 * 单元格组件
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "../../style.scss";

/**
 * @interface props
 */
export interface CellItemProps {
  text: string | number;
}
const CellItem: FC<CellItemProps> = ({ text }: CellItemProps): ReactElement => {
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
    <div className={className["cell"]}>
      <div>{text}</div>
    </div>
  );
};

export default CellItem;
