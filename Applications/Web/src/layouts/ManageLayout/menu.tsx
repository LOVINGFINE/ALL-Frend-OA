/*
 * Created by zhangq on 2021/11/25
 *
 */
import { ReactElement, FC, useEffect, useState } from "react";
import { RouteItem } from "dyl-plugins";
import { ManageMenuProps } from "../type";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "@/components";
import { MenuItemType } from "@/components/Menu";
import className from "../style.scss";

const ManageMenu: FC<ManageMenuProps> = ({
  routes,
}: ManageMenuProps): ReactElement => {
  /** state */
  const location = useLocation();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  /** LifeCycle */
  useEffect(() => {
    // init
    setMenuItems(getMenuItmes(routes));
  }, [routes]);
  const getMenuItmes = (list: RouteItem[]): MenuItemType[] => {
    return list.map((ele) => {
      return {
        key: ele.path || "",
        icon: ele.icon,
        title: ele.title,
        children: ele.routes
          ? getMenuItmes(
              ele.routes.map((item) => ({
                ...item,
                path: (ele.path || "*") + item.path,
              }))
            )
          : undefined,
      };
    });
  };
  const itemClick = (item: MenuItemType) => {
    navigate(item.key);
  };
  /** render */
  return (
    <div className={className["manageLayout-left"]}>
      <Menu
        dataSource={menuItems}
        selectKeys={[location.pathname]}
        onClick={itemClick}
      />
    </div>
  );
};

export default ManageMenu;
