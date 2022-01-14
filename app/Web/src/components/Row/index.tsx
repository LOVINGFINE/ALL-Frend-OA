/*
 * Created by zhangq on 2021/11/26
 * colume 组件
 */
import { ReactElement, FC, MouseEvent } from "react";
import "./cloumn.scss";

const Row: FC<RowProps> = ({
  children,
  style,
  className,
  onClick,
}: RowProps): ReactElement => {
  /** render */
  const boxClassName = `dyl-column ${className}`;
  return (
    <div onClick={onClick} className={boxClassName} style={style}>
      {children}
    </div>
  );
};

export interface RowProps {
  children?: ReactElement | ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  onClick?(e: MouseEvent): void;
}
export default Row;
