import { RouteItem } from "dyl-plugins";
const routes: RouteItem[] = [
  {
    name: "login",
    path: "/login",
    component: "pages/login",
    title: "登录",
  },
  {
    name: "homepage",
    path: "/homepage",
    component: "pages/homepage",
    title: "主页",
  },
  {
    name: "basic-page",
    path: "/",
    component: "layouts/BasicLayout",
    title: "basic",
    routes: [
      {
        name: "sheet-editor",
        path: "sheet-editor",
        component: "pages/sheet-editor",
        title: "表格编辑器",
      },
    ],
  },
  {
    name: "manage",
    path: "/manage",
    component: "layouts/ManageLayout",
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
