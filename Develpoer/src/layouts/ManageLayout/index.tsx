/*
 * Created by zhangq on 2022/03/30
 *
 */
import { ReactElement, FC, useEffect, useState } from "react";
import Head from "next/head";
import ManageMenu from "./components/Menu";
import className from "../style.module.scss";

const MangePage: FC = (props): ReactElement => {
  /** state */
  const [tep, setTep] = useState<string>("");

  /** LifeCycle */
  useEffect(() => {
    // init
    // console.log(props);
  }, []);

  /**
   * @method
   */
  const init = () => {};

  /** render */
  return (
    <div className={className["manage"]}>
      <div className={className["manage-top"]}></div>
      <ManageMenu />
      <div className={className["manage-main"]}>
        <div className={className["manage-main-card"]}>{props.children}</div>
      </div>
    </div>
  );
};

export default MangePage;
