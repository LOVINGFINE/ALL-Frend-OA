/*
 * Created by zhangq on 2022/02/14
 * 表格编辑器
 */
import { ReactElement, FC, useState, useEffect } from "react";
import className from "./style.scss";
import { getSheetHeaders, getSheetEntries } from "@/service";
import { EditorContextProvider } from "./context";
import MetaTable from "./Table";
import Top from "./components/Top";
import { SheetEntry, SheetHeader } from "./type";

const SheetEditor: FC = (): ReactElement => {
  const [headers, setHeaders] = useState<SheetHeader[]>([]);
  const [entries, setEntries] = useState<SheetEntry[]>([]);

  useEffect(() => {
    const sheetId = "lf-sheet-AA123456";
    getSheetHeaders(sheetId).then((res) => {
      setHeaders(res);
    });
    getSheetEntries(sheetId, { page: 1, pageSize: 50 }).then((res) => {
      setEntries(res.list);
    });
  }, []);

  return (
    <EditorContextProvider>
      <div className={className["page"]}>
        <div className={className["page-content"]}>
          <Top />
          <div className={className["page-content-table"]}>
            {<MetaTable headers={headers} entries={entries} />}
          </div>
        </div>
      </div>
    </EditorContextProvider>
  );
};

export default SheetEditor;
