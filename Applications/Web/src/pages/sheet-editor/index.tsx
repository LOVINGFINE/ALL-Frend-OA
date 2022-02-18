/*
 * Created by zhangq on 2022/02/14
 * 表格编辑器
 */
import { ReactElement, FC } from "react";
import className from "./style.scss";
import { EditorContextProvider } from "./context";
import EditorTable from "./components/Table";
import Top from "./components/Top";

const SheetEditor: FC = (): ReactElement => {
  /** render */
  return (
    <EditorContextProvider>
      <div className={className["page"]}>
        <div className={className["page-content"]}>
          <Top />
          {<EditorTable />}
        </div>
      </div>
    </EditorContextProvider>
  );
};

export default SheetEditor;
