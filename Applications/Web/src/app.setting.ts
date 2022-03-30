import logo from "@/assets/img/logo.png";

const defaultSetting: AppSetting = {
  publicPath: "/",
  websiteName: "All-Frend-OA-WEB",
  logo,
};

export interface AppSetting {
  publicPath: string;
  websiteName: string;
  logo: string;
}
export default defaultSetting;
