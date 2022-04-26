import { RouteItem } from "dyl-plugins";
export interface ManageLayoutProps extends RouteItem {
  children?: React.ReactElement;
}
export interface ManageMenuProps {
  routes: RouteItem[];
  basePath: string;
}
