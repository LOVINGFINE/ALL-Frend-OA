/*
 * Created by zhangq on 2021/05/20
 * layout
 */

import { ReactElement, FC } from "react";
import className from "../style.module.scss";

const BasicLayout: FC<BasicLayoutProps> = ({
  children,
}: BasicLayoutProps): ReactElement => {
  /** render */
  return (
    <div className={className["basicLayout"]}>
      <div className={className["basicLayout-contanier"]}>{children}</div>
    </div>
  );
};

export interface BasicLayoutProps {
  children?: React.ReactElement;
}

export default BasicLayout;
