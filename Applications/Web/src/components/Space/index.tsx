/*
 * Created by zhangq on 2021/11/26
 * Space 组件
 */
import { ReactElement, FC, MouseEvent } from "react";
import "./space.scss";

const Space: FC<SpaceProps> = ({
  children,
  style,
  className,
  onClick,
}: SpaceProps): ReactElement => {
  /** render */
  const boxClassName = `dyl-column ${className}`;
  return (
    <div onClick={onClick} className={boxClassName} style={style}>
      {children}
    </div>
  );
};

export interface SpaceProps {
  children?: ReactElement | ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  onClick?(e: MouseEvent): void;
}
export default Space;
