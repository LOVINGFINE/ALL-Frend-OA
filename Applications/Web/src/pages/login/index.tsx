/*
 * Created by zhangq on 2022/02/01
 * 登录页
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "./style.scss";
import LoginForm from "./widgets/form";
import AppSetting from "@/app.setting";

const LoginPage: FC = (): ReactElement => {
  /** state */
  const [phone, setPhone] = useState<string>("");

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
    <div className={className["login"]}>
      <div className={className["login-content"]}>
        <div className={className["login-content-logo"]}>
          <img
            src={AppSetting.logo}
            className={className["login-content-logo-img"]}
          />
        </div>
        <span className={className["login-content-title"]}>
          {AppSetting.websiteName}
        </span>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
