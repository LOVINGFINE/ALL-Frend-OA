/*
 * Created by zhangq on 2022/03/29
 * 登录 form
 */
import { ReactElement, FC, useEffect, useState, useContext } from "react";
import className from "../style.scss";
import { useNavigate } from "react-router-dom";
import { Button, Input, message } from "@/components";
import { userLogin } from "@/service/user";
import globalContext from "@/global";
/**
 * @interface props
 */
export interface LoginFormProps {}
const LoginForm: FC<LoginFormProps> = ({}: LoginFormProps): ReactElement => {
  const global = useContext(globalContext);
  const navigate = useNavigate();
  /** state */
  const [username, setUsername] = useState("18154175562");
  const [password, setPassword] = useState("lf123456");
  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */
  const login = () => {
    userLogin({ username, password })
      .then((res) => {
        global.dispatch("user", res);
        navigate("/");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  /** render */
  return (
    <div className={className["form"]}>
      <div className={className["form-item"]}>
        <div className={className["form-item-label"]}>用户名</div>
        <Input
          value={username}
          size={"small"}
          change={(e) => {
            setUsername(e);
          }}
        />
      </div>
      <div className={className["form-item"]}>
        <div className={className["form-item-label"]}>密码</div>
        <Input
          value={password}
          size={"small"}
          change={(e) => {
            setPassword(e);
          }}
        />
      </div>
      <div className={className["form-submit"]}>
        <Button onClick={login} type={"primary"} style={{ width: "100%" }}>
          <div className={className["form-submit-text"]}>{"登 录"}</div>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
