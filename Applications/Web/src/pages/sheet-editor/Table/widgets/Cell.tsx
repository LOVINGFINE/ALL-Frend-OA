/*
 * Created by zhangq on 2022/04/22
 * table colunm
 */
import { ReactElement, FC, useEffect, useState, useRef } from "react";
import className from "../style.scss";
import { Colunm } from "../constant";
import { MetaType, SheetRecordValue } from "../../type";

const CellItem: FC<CellItemProps> = ({
  colunm,
  text,
  onChange,
}: CellItemProps): ReactElement => {
  const inputRef = useRef<any>(null);
  const [editting, setEditting] = useState<boolean>(false);
  /** state */
  const [value, setValue] = useState<SheetRecordValue>("");
  const [input, setInput] = useState("");

  /** LifeCycle */
  useEffect(() => {
    // init
    setValue(colunm.getValue(text));
  }, [text]);

  /**
   * @method
   */
  function onInput(e: any) {
    setInput(e.target.value);
  }

  function onEdit() {
    setEditting(true);
    if (typeof value !== "string") {
      setInput(value.toString());
    } else {
      setInput(value);
    }
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      });
    }
  }

  function onInputBlur() {
    if (input !== value && onChange) {
      onChange(input);
      setValue(input);
    }
    setEditting(false);
  }

  /** render */
  return (
    <div className={className["cellItem"]} onDoubleClick={onEdit}>
      <input
        className={className["cellItem-input"]}
        type="text"
        style={!editting ? { display: "none" } : {}}
        ref={inputRef}
        onBlur={onInputBlur}
        value={input}
        onInput={onInput}
      />
      {!editting && (
        <RenderMetaCell
          label={colunm.getLabel(value)}
          type={colunm.type}
          value={value}
        />
      )}
    </div>
  );
};

/**
 * @interface props
 */
export interface CellItemProps {
  colunm: Colunm;
  text: SheetRecordValue;
  onChange?(val: boolean | string | number): void;
}

function RenderMetaCell({
  type,
  value,
  label,
}: {
  type: MetaType;
  label: string;
  value: SheetRecordValue;
}) {
  switch (type) {
    case "File":
      return <div className={className["render-file"]}>{label}</div>;
    case "QrCode":
      return <div className={className["render-qr"]}>{label}</div>;
    default:
      return <div className={className["render-default"]}>{label}</div>;
  }
}
export default CellItem;
