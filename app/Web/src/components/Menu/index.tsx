/*
 * Created by zhangq on 2021/11/25
 *
 */
import { ReactElement, FC, useEffect, useState } from "react";
import className from "./menu.scss";
/**
 * @interface props
 */
export interface MenuProps {
  dataSource: MenuItemType[];
  selectKeys: string[];
  onClick?(e: MenuItemType): void;
}
export interface MenuItemType {
  key: string;
  title?: string;
  icon?: string | ReactElement;
  disibled?: boolean;
  children?: MenuItemType[];
}
export const Menu: FC<MenuProps> = ({
  dataSource,
  selectKeys,
  onClick,
}: MenuProps): ReactElement => {
  const [expendKeys, setExpendKeys] = useState<string[]>([]);
  /** LifeCycle */
  useEffect(() => {
    // init
  }, []);

  /**
   * @method
   */
  // 获取item 类名
  const getTypeClass = (item: MenuItemType) => {
    if (selectKeys.includes(item.key)) {
      return "selected";
    }
    if (item?.disibled) {
      return "disibled";
    }
    return "default";
  };

  // 是否展开
  const isExpend = (key: string) => {
    return expendKeys.includes(key);
  };

  const change = (item: MenuItemType) => {
    if (item.children && !expendKeys.includes(item.key)) {
      setExpendKeys([...expendKeys, item.key]);
    } else {
      // 选中
      if (!!onClick) {
        onClick(item);
      }
    }
  };
  /** render */
  return (
    <div className={className["menu"]}>
      {dataSource.map((ele) => {
        return (
          <div key={ele.key} className={className["menu-item"]}>
            <div
              className={`${className["menu-item-box"]} ${
                className["menu-item-" + getTypeClass(ele)]
              }`}
              onClick={() => change(ele)}
            >
              {ele.icon}
              <span>{ele.title || ele.key}</span>
              <span>g</span>
            </div>
            {isExpend(ele.key) && ele.children && (
              <Menu dataSource={ele.children} selectKeys={selectKeys} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
