/*
 * Created by zhangq on 2022/02/01
 * 登录页
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "./style.scss";
import { Button } from "@/components";
import Input from "@/components/Input";
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
    <div className={className["login-page"]}>
      <div className={className["login-page-logo"]}></div>
      <div className={className["login-page-form"]}>
        <Input
          value={phone}
          change={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
};

export default LoginPage;
