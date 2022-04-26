/*
 * Created by zhangq on 2022/04/22
 * table colunm
 */
import { ReactElement, FC, useEffect, useState } from "react";
import { Icon } from "dyl-design";
import className from "../style.scss";
import { Colunm } from "../constant";

const ColunmItem: FC<ColunmItemProps> = ({
  colunm,
}: ColunmItemProps): ReactElement => {
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
    <div className={className["colunmItem"]}>
      <div className={className["colunmItem-code"]}>{colunm.code}</div>
      <div className={className["colunmItem-meta"]}>
        <span className={className["colunmItem-meta-icon"]}></span>
        <span className={className["colunmItem-meta-title"]}>
          {colunm.title}
        </span>
        <span className={className["colunmItem-meta-edit"]}>
          <Icon name="dots-three-vertical" />
        </span>
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface ColunmItemProps {
  colunm: Colunm;
}
export default ColunmItem;
