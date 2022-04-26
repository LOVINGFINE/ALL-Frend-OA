/*
 * Created by zhangq on 2022/02/16
 * 表格
 */
import { ReactElement, FC, useEffect, useState, useRef } from "react";
import ColunmItem from "./widgets/Colunm";
import CellItem from "./widgets/Cell";
import className from "./style.scss";
import { Colunm } from "./constant";
import { SheetHeader, SheetEntry } from "../type";
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

  const displayStyle = getDisplayStyle(colunms, props.entries.length);
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

  /** render */
  return (
    <div
      className={className["table-overheight"]}
      onScroll={onScroll}
      ref={tableDisplayRef}
    >
      <ul className={className["table"]} style={{ ...displayStyle }}>
        {displayColunms.map((col) => {
          return (
            <li
              key={col.id}
              className={className["table-col"]}
              style={{
                width: col.width,
              }}
            >
              <div
                className={className["table-top"]}
                style={{
                  width: col.width,
                }}
              >
                <ColunmItem colunm={col} />
              </div>
              {props.entries.map((ele) => {
                return (
                  <div
                    className={className["table-row"]}
                    key={`${col.id}-${ele.id}`}
                  >
                    <CellItem colunm={col} text={ele.record[col.id]} />
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
  headers: SheetHeader[];
  entries: SheetEntry[];
}

export default MetaTable;
