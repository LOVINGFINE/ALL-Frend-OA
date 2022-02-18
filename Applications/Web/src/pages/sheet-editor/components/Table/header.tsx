/*
 * Created by zhangq on 2022/02/17
 * 列头组件
 */
import { ReactElement, FC, useEffect, useState } from "react";
import { Colunm } from "../../utils/format";
import className from "../../style.scss";

/**
 * @interface props
 */
export interface HeaderItemProps {
  column: Colunm;
}
const HeaderItem: FC<HeaderItemProps> = ({
  column,
}: HeaderItemProps): ReactElement => {
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
    <div className={className["header"]}>
      <div>{column.code}</div>
    </div>
  );
};

export default HeaderItem;
