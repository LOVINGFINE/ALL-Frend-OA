/*
 * Created by zhangq on 2022/04/22
 * table colunm
 */
import { ReactElement, FC, useEffect, useState } from "react";
import { Icon } from "dyl-design";
import className from "../style.scss";
import { Colunm } from "../constant";
import { MetaType, SheetColumnPayload } from "../../type";

const ColunmItem: FC<ColunmItemProps> = ({
  colunm,
  change,
}: ColunmItemProps): ReactElement => {
  /** state */
  const [input, setInput] = useState("");

  /** LifeCycle */
  useEffect(() => {
    // init
    setInput(colunm.title);
  }, []);

  /**
   * @method
   */
  function onInput(e: any) {
    setInput(e.target.value);
  }

  function onInputBlur() {
    if (input !== colunm.title) {
      onChange({ title: input });
    }
  }

  function onChange(payload: { title?: string; type?: MetaType }) {
    if (change) {
      change({
        id: colunm.id,
        ...payload,
      });
    }
  }
  /** render */
  return (
    <div className={className["colunmItem"]}>
      <div className={className["colunmItem-code"]}>{colunm.code}</div>
      <div className={className["colunmItem-meta"]}>
        <span className={className["colunmItem-meta-icon"]}></span>
        <input
          type="text"
          value={input}
          onInput={onInput}
          className={className["colunmItem-input"]}
          onBlur={onInputBlur}
        />
        <span className={className["colunmItem-meta-edit"]}>
          <Icon name="dots-three-vertical" />
        </span>
      </div>
    </div>
  );
};

/**
 * @interface props
 */
export interface ColunmItemProps {
  colunm: Colunm;
  change?(e: SheetColumnPayload): void;
}
export default ColunmItem;
