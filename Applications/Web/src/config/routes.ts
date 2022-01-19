import { RouteItem } from "dyl-plugins";
const routes: RouteItem[] = [
  {
    name: "homepage",
    path: "/homepage",
    component: "pages/homepage",
    title: "主页",
  },
  {
    name: "manage",
    path: "/",
    component: "layouts/BasicLayout",
    title: "管理",
    routes: [
      {
        name: "analysis",
        path: "analysis",
        component: "pages/analysis/index",
        title: "表格",
      },
      {
        name: "site",
        path: "site",
        component: "pages/site/index",
        title: "设置",
      },
    ],
  },
  // {
  //   path: "/",
  //   exact: true,
  //   redirect: "/homepage",
  // },
];

export default routes;
