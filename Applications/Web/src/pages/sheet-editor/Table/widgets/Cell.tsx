/*
 * Created by zhangq on 2022/04/22
 * table colunm
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "../style.scss";
import { Colunm } from "../constant";
import { MetaType, SheetRecordValue } from "../../type";

const CellItem: FC<CellItemProps> = ({
  colunm,
  text,
}: CellItemProps): ReactElement => {
  /** state */
  const [value, setValue] = useState<string | number | boolean>("");

  /** LifeCycle */
  useEffect(() => {
    // init
    setValue(colunm.getValue(text));
  }, [text]);

  /**
   * @method
   */

  /** render */
  return (
    <div className={className["cellItem"]}>
      <RenderMetaCell type={colunm.type} value={colunm.getText(text)} />
    </div>
  );
};

/**
 * @interface props
 */
export interface CellItemProps {
  colunm: Colunm;
  text: SheetRecordValue;
}

function RenderMetaCell({ type, value }: { type: MetaType; value: any }) {
  switch (type) {
    case "File":
      return <div className={className["render-file"]}>{value}</div>;
    case "QrCode":
      return <div className={className["render-qr"]}>{value}</div>;
    default:
      return <div className={className["render-default"]}>{value}</div>;
  }
}
export default CellItem;
