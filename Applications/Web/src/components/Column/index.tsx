/*
 * Created by zhangq on 2021/11/26
 * colume 组件
 */
import { ReactElement, FC, MouseEvent } from "react";
import "./cloumn.scss";

const Column: FC<ColumnProps> = ({
  children,
  style,
  className,
  onClick,
}: ColumnProps): ReactElement => {
  /** render */
  const boxClassName = `dyl-column ${className}`;
  return (
    <div onClick={onClick} className={boxClassName} style={style}>
      {children}
    </div>
  );
};

export interface ColumnProps {
  children?: ReactElement | ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  onClick?(e: MouseEvent): void;
}
export default Column;
