/*
 * Created by zhangq on 2022/02/16
 * 表格
 */
import { ReactElement, FC, useEffect, useState, useRef } from "react";
import ColunmItem from "./widgets/Colunm";
import CellItem from "./widgets/Cell";
import className from "./style.scss";
import { Colunm } from "./constant";
import {
  SheetColumn,
  SheetEntry,
  SheetEntriesPayload,
  SheetColumnPayload,
} from "../type";
import { transformVcColunm, getDisplayStyle } from "./utils";

const MetaTable: FC<MetaTableProps> = (props: MetaTableProps): ReactElement => {
  const tableDisplayRef = useRef(null);
  const [colunms, setColunms] = useState<Colunm[]>([]);
  const [scrollTo, setScrollTo] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [display, setDisplay] = useState<{
    width: 0;
    height: 0;
  }>({
    width: 0,
    height: 0,
  });

  const ulStyle = getDisplayStyle(colunms, props.entries.length);
  const displayColunms = transformVcColunm(colunms, {
    scrollTo,
    extra: 5,
    display,
  });

  useEffect(() => {
    const { headers } = props;
    let left = 0;
    const cols = headers.map((ele, i) => {
      if (i > 0) {
        left += ele.width;
      }
      return new Colunm({
        ...ele,
        left,
      });
    });
    setColunms(cols);
  }, [props.headers]);

  useEffect(() => {
    if (tableDisplayRef.current) {
      const { offsetHeight, offsetWidth } = tableDisplayRef.current;
      setDisplay({
        width: offsetWidth,
        height: offsetHeight,
      });
    }
  }, []);

  /**
   * @method
   */
  function onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    const scrollLeft = event.target.scrollLeft;
    setScrollTo({
      y: Math.floor(scrollTop + 1),
      x: Math.floor(scrollLeft / 40) * 40,
    });
  }

  function updateCell({
    val,
    colunmId,
    id,
  }: {
    val: number | string | boolean;
    colunmId: string;
    id: string;
  }) {
    // 单个修改
    updateEntries({
      [id]: {
        [colunmId]: val,
      },
    });
  }

  function updateEntries(rows: SheetEntriesPayload) {
    if (props?.onCellChange) {
      props.onCellChange(rows);
    }
  }

  function onColunmChange(payload: SheetColumnPayload) {
    if (props?.onColumnChange) {
      props.onColumnChange(payload);
    }
  }
  /** render */
  return (
    <div
      className={className["table-overheight"]}
      onScroll={onScroll}
      ref={tableDisplayRef}
    >
      <ul className={className["table"]} style={{ ...ulStyle }}>
        {displayColunms.map((col, colIndex) => {
          return (
            <li
              key={col.id}
              className={
                display.width > ulStyle.width
                  ? className["table-col-right"]
                  : className["table-col"]
              }
              style={{
                width: col.width,
              }}
            >
              <div
                className={className["table-top"]}
                style={{
                  width: col.width - 1,
                }}
              >
                <ColunmItem change={onColunmChange} colunm={col} />
              </div>
              {props.entries.map((ele, i) => {
                return (
                  <div
                    className={className["table-row"]}
                    key={`${col.id}-${ele.id}`}
                  >
                    <CellItem
                      colunm={col}
                      onChange={(val) =>
                        updateCell({
                          val,
                          colunmId: col.id,
                          id: ele.id,
                        })
                      }
                      text={ele.record[col.id]}
                    />
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export interface MetaTableProps {
  headers: SheetColumn[];
  entries: SheetEntry[];
  onCellChange?(e: SheetEntriesPayload): void;
  onColumnChange?(e: SheetColumnPayload): void;
}

export default MetaTable;
