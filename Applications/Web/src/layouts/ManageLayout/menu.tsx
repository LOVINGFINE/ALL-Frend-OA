/*
 * Created by zhangq on 2021/11/25
 *
 */
import { ReactElement, FC } from "react";
import { RouteItem } from "dyl-plugins";
import { ManageMenuProps } from "../type";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu } from "dyl-design";
import { MenuItemType } from "dyl-design/lib/Menu";
import className from "../style.scss";

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
const ManageMenu: FC<ManageMenuProps> = ({
  routes,
}: ManageMenuProps): ReactElement => {
  /** state */
  const location = useLocation();
  const navigate = useNavigate();
  const menuItems = getMenuItmes(routes);
  /** LifeCycle */

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
