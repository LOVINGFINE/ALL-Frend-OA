export interface ManageLayoutProps {
  routes: DynamicRouteContext.RouteItem[];
  path?: string;
  children?: React.ReactElement;
}
export interface BasicMenuProps {
  routes: DynamicRouteContext.RouteItem[];
  basePath: string;
}

export interface BasicLayoutProps {
  children?: React.ReactElement;
}
