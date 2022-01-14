/*
 * Created by zhangq on 2021/07/12
 * error 组件
 */
import { ReactElement, useEffect } from "react";
import style from "./style.scss";

const ErrorComponent = ({ children }: ErrorProps): ReactElement => {
  /** state */
  // const [tep, setTep] = useState<string>("");

  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */
  // const init = () => {};

  /** render */
  return <div className={style.content}>{children}</div>;
};

/**
 * @interface props
 */
export interface ErrorProps {
  children?: ReactElement;
}

export default ErrorComponent;
