/*
 * Created by zhangq on 2022/02/16
 * 表格 工具
 */

import { ReactElement, FC, useEffect, useContext } from "react";
import editorContext from "../../context";
import className from "../../style.scss";
import { Button } from "dyl-design";

const EditorTable: FC = (): ReactElement => {
  const { dispatch } = useContext(editorContext);
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */
  const upload = () => {};

  /** render */
  return (
    <div className={className["top"]}>
      <Button onClick={upload}>上传文件</Button>
    </div>
  );
};

export default EditorTable;
