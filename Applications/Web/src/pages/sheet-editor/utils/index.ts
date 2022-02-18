import { Colunm } from "./format";
export const getInitState = () => {
  const InitConfig = {
    column: 20,
    row: 50,
  };
  const { column, row } = InitConfig;
  const initColumns: Colunm[] = [];
  const initRow: { [key: string]: string } = {};
  const rows = [];
  // 初始化列
  for (let index = 0; index < column; index++) {
    const col = new Colunm({
      index,
    });
    initColumns.push(col);
    initRow[col.code] = "";
  }
  // 初始化行
  for (let i = 0; i < row; i++) {
    rows.push(initRow);
  }
  return {
    rows,
    colunms: initColumns,
  };
};
