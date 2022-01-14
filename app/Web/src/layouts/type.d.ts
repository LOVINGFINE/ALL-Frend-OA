export interface BasicLayoutProps {
  routes: DynamicRouteContext.RouteItem[];
  path?: string;
  children?: React.ReactElement;
}
export interface BasicMenuProps {
  routes: DynamicRouteContext.RouteItem[];
  basePath: string;
}
