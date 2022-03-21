/*
 * Created by zhangq on 2022/03/21
 *
 */
import { ReactElement, FC, useEffect, useState } from "react";

const FontPage: FC = (): ReactElement => {
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
  return <div>{"AAAA"}</div>;
};

export default FontPage;
