/*
 * Created by zhangq on 2022/02/01
 * 登录页
 */
import { ReactElement, FC, useEffect, useState } from "react";
import style from "./style.scss";
const LoginPage: FC = (): ReactElement => {
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
  return <div className={style.content}></div>;
};

export default LoginPage;
