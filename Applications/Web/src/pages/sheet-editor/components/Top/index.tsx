/*
 * Created by zhangq on 2022/02/16
 * 表格 工具
 */
import { ReactElement, FC, useEffect, useContext } from "react";
import editorContext from "../../context";
import className from "../../style.scss";

const EditorTable: FC = (): ReactElement => {
  const { dispatch } = useContext(editorContext);
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */
  const init = () => {};

  /** render */
  return <div className={className["top"]}></div>;
};

export default EditorTable;
