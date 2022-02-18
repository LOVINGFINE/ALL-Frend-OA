/*
 * Created by zhangq on 2022/02/16
 * 表格
 */
import { ReactElement, FC, useEffect, useContext } from "react";
import editorContext from "../../context";
import className from "../../style.scss";
import CellItem from "./cell";
import ColunmItem from "./header";
import IndexCol from "./number";

const EditorTable: FC = (): ReactElement => {
  const context = useContext(editorContext);
  console.log(context);

  /**
   * @method
   */
  const init = () => {};

  /** render */
  return (
    <div className={className["table-border"]}>
      <div className={className["table"]}>
        <IndexCol rows={context.rows} />
        {context.colunms.map((ele) => {
          return (
            <div
              key={ele.code}
              style={{ width: ele.width }}
              className={className["table-li"]}
            >
              <ColunmItem column={ele} />
              {context.rows.map((cell, i) => {
                return (
                  <CellItem
                    key={`cell-${ele.index}-${i}`}
                    text={cell[ele.index]}
                  />
                );
              })}
              <div className={className["drop-line"]}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditorTable;
