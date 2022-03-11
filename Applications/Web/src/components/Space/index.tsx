/*
 * Created by zhangq on 2021/11/26
 * Space 组件
 */
import { ReactElement, FC, MouseEvent } from "react";
import "./space.scss";

const Space: FC<SpaceProps> = ({
  children,
  style,
  prefix = "dyl",
  direction = "row",
}: SpaceProps): ReactElement => {
  /** render */
  return (
    <div
      className={`${prefix}-space ${prefix}-space-${direction}`}
      style={style}
    >
      {children}
    </div>
  );
};

export interface SpaceProps {
  children?: ReactElement | ReactElement[];
  style?: React.CSSProperties;
  direction?: "row" | "column";
  prefix?: string;
}
export default Space;
