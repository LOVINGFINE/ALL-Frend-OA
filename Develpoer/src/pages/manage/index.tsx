/*
 * Created by zhangq on 2022/03/30
 *
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "../../styles/style.module.scss";

/**
 * @interface props
 */
export interface indexProps {
  children?: ReactElement;
}
const index: FC<indexProps> = ({ children }: indexProps): ReactElement => {
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
  return <div className={className["manage"]}></div>;
};

export default index;
