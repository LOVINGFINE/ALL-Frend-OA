/*
 * Created by zhangq on 2022/02/14
 * 表格编辑器
 */
import { ReactElement, FC, useState, useEffect } from "react";
import MetaTable from "./Table";
import Top from "./components/Top";
import className from "./style.scss";
import {
  SheetEntry,
  SheetColumn,
  SheetEntriesPayload,
  SheetColumnPayload,
} from "./type";
import {
  getSheet,
  getSheetEntriesByPage,
  updateSheetEntries,
  updateSheetColumn,
} from "@/service";
import { EditorContextProvider } from "./context";

const sheetId = "1D6E08787455399B075E76677E428EAA";
const SheetEditor: FC = (): ReactElement => {
  const [headers, setHeaders] = useState<SheetColumn[]>([]);
  const [entries, setEntries] = useState<SheetEntry[]>([]);

  useEffect(() => {
    getSheet(sheetId).then((res) => {
      setHeaders(res.columns);
    });
    getSheetEntriesByPage(sheetId, { page: 1, pageSize: 50 }).then((res) => {
      setEntries(res.records);
    });
  }, []);

  function onCellChange(rows: SheetEntriesPayload) {
    updateSheetEntries(sheetId, rows).then((res) => {
      console.log(res);
    });
  }

  function onColumnChange(payload: SheetColumnPayload) {
    updateSheetColumn(sheetId, payload).then((res) => {
      console.log(res);
    });
  }
  return (
    <EditorContextProvider>
      <div className={className["page"]}>
        <div className={className["page-content"]}>
          <Top />
          <div className={className["page-content-table"]}>
            {
              <MetaTable
                onCellChange={onCellChange}
                onColumnChange={onColumnChange}
                headers={headers}
                entries={entries}
              />
            }
          </div>
        </div>
      </div>
    </EditorContextProvider>
  );
};

export default SheetEditor;
