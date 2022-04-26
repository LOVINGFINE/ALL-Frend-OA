/*
 * Created by zhangq on 2022/04/26
 * menu
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "../../style.module.scss";

/**
 * @interface props
 */
export interface MenuProps {
  children?: ReactElement;
}
const ManageMenu: FC<MenuProps> = ({}: MenuProps): ReactElement => {
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
  return <div className={className["manage-menu"]}></div>;
};

export default ManageMenu;
