import { RouteItem } from "dyl-plugins";
export interface ManageLayoutProps extends RouteItem {
  children?: React.ReactElement;
}
export interface ManageMenuProps {
  routes: DynamicRouteContext.RouteItem[];
  basePath: string;
}

export interface BasicLayoutProps extends RouteItem {
  children?: React.ReactElement;
}
